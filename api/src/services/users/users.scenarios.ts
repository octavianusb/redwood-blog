import type { Prisma, User } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.UserCreateArgs>({
    user: {
        one: {
            data: {
                email: 'String5216495',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2025-04-09T20:18:04.954Z',
            },
        },
        two: {
            data: {
                email: 'String6524678',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2025-04-09T20:18:04.954Z',
            },
        },
    },
});

export type StandardScenario = ScenarioData<User, 'user'>;
