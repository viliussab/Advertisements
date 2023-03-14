import React from 'react';

export type ColumnConfig<T> = {
  title: string;
  renderCell: (elem: T) => React.ReactNode;
  key: string;
};

type TableProps<T> = {
  columns: ColumnConfig<T>[];
  data: T[];
  onClick?: (elem: T) => void;
  keySelector: (elem: T) => string;
};

export default function Table<T>(props: TableProps<T>) {
  const { columns, data, onClick, keySelector } = props;
  const headers = columns.map((c) => c.title);

  return (
    <table className="text-left text-sm text-gray-500">
      <thead className="bg-gray-100 text-xs uppercase text-gray-700">
        <tr>
          {headers.map((columnName) => (
            <th
              scope="col"
              key={columnName}
              className={`sticky bg-gray-100 py-3 px-6`}
            >
              <div className="flex justify-center align-middle text-sm">
                {columnName}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((elem) => (
          <tr
            key={keySelector(elem)}
            onClick={() => onClick && onClick(elem)}
            className={`nth border-b
                ${onClick && 'hover:cursor-pointer'}`}
          >
            {columns.map((c) => (
              <td key={c.key} className="py-1 px-1">
                <div className="flex items-center justify-center align-middle">
                  {c.renderCell(elem)}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
