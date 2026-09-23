const parseThreshold = (
    name: string,
    defaultValue: number,
): number => {
    const value = Number(process.env[name] ?? defaultValue);

    if (!Number.isFinite(value) || value < 0 || value > 100) {
        throw new Error(
            `${name} must be a number between 0 and 100`,
        );
    }

    return value;
};

export const PROGRESS_THRESHOLDS = {
    attendance: parseThreshold(
        'PROGRESS_ATTENDANCE_THRESHOLD',
        90,
    ),
    assignment: parseThreshold(
        'PROGRESS_ASSIGNMENT_THRESHOLD',
        85,
    ),
    mockScore: parseThreshold(
        'PROGRESS_MOCK_SCORE_THRESHOLD',
        80,
    ),
} as const;