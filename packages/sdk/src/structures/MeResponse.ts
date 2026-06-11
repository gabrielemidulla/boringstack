import type { tags } from "typia";

export type MeResponse = {
  user: {
    id: string;
    createdAt: string & tags.Format<"date-time">;
    updatedAt: string & tags.Format<"date-time">;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: null | undefined | string;
  };
  session: {
    id: string;
    createdAt: string & tags.Format<"date-time">;
    updatedAt: string & tags.Format<"date-time">;
    userId: string;
    expiresAt: string & tags.Format<"date-time">;
    token: string;
    ipAddress?: null | undefined | string;
    userAgent?: null | undefined | string;
  };
};
