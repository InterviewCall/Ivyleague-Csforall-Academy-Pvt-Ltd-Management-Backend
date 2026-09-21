import { createHash } from 'node:crypto';

import { Brand, Prisma } from '@app/model/generated/prisma/client.js';
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { MarkdownService } from '@app/common';

import { BrandRepository } from '../brand/brand.repository.js';
import { CreateTcVersionDto } from './dto/create-tc-version.dto.js';
import { CurrentTcVersionQuery } from './dto/current-tc-version.query.js';
import { PublishedTcVersion } from './types/published-tc-version.type.js';
import { RenderedTcVersion } from './types/rendered-tc-version.type.js';
import { TcVersionRepository } from './tc-version.repository.js';

@Injectable()
export class TcVersionService {
    constructor(
        private readonly tcVersionRepository: TcVersionRepository,
        private readonly brandRepository: BrandRepository,
        private readonly markdownService: MarkdownService,
    ) {}

    /**
     * The terms in force, rendered for display. Public: the learner accepts
     * before any session exists (FR-8), so this cannot require one.
     */
    async findCurrent(query: CurrentTcVersionQuery): Promise<RenderedTcVersion> {
        const brand = await this.resolveBrand(query.brandCode);

        const current = await this.tcVersionRepository.findCurrent(
            query.document,
            brand?.id ?? null,
        );

        if (!current) {
            throw new NotFoundException(
                `No ${query.document} have been published for this brand`,
            );
        }

        return {
            id: current.id,
            document: current.document,
            version: current.version,
            brandCode: brand?.code ?? null,
            // Rendered and sanitised per request, never stored as HTML.
            html: this.markdownService.render(current.content),
            contentHash: current.contentHash,
            publishedAt: current.publishedAt,
        };
    }

    async publish(
        payload: CreateTcVersionDto,
        publishedByUserId: number,
    ): Promise<PublishedTcVersion> {
        const brand = await this.resolveBrand(payload.brandCode);

        const contentHash = createHash('sha256')
            .update(payload.content, 'utf8')
            .digest('hex');

        const version =
            (await this.tcVersionRepository.findLatestVersion(
                payload.document,
                brand?.id ?? null,
            )) + 1;

        try {
            const created = await this.tcVersionRepository.create({
                document: payload.document,
                version,
                brandId: brand?.id ?? null,
                content: payload.content,
                contentHash,
                publishedAt: new Date(),
                createdByUserId: publishedByUserId,
            });

            return {
                id: created.id,
                document: created.document,
                version: created.version,
                brandCode: brand?.code ?? null,
                contentHash: created.contentHash,
                publishedAt: created.publishedAt,
            };
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'Another version was just published. Reload and try again.',
                );
            }

            throw error;
        }
    }

    private async resolveBrand(
        brandCode: string | undefined,
    ): Promise<Brand | null> {
        if (!brandCode) {
            return null;
        }

        const [brand] = await this.brandRepository.findManyByCodes([brandCode]);

        if (!brand) {
            throw new NotFoundException(`Unknown brand code: ${brandCode}`);
        }

        return brand;
    }
}
