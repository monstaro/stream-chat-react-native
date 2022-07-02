import { DB_NAME } from '../../constants';
import type { MessageRow } from '../../types';

export const getMessagesForChannels = (cids: string[]): MessageRow[] => {
  const questionMarks = cids.map((c) => '?').join(',');
  const { message, rows, status } = sqlite.executeSql(
    DB_NAME,
    `SELECT * FROM (
      SELECT
        *,
        ROW_NUMBER() OVER (
          PARTITION BY cid
          ORDER BY datetime(createdAt) DESC
        ) RowNum
      FROM messages
      WHERE cid in (${questionMarks})
    ) t
    WHERE RowNum < 20`,
    cids,
  );

  if (status === 1) {
    console.error(`Querying for channels failed: ${message}`);
  }

  return rows ? rows._array : [];
};
