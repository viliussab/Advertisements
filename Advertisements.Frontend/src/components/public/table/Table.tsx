import React from 'react';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';

export type ColumnConfig<T> = {
  title: string;
  renderCell: (elem: T) => React.ReactNode;
  key: string;
  filter?: {
    renderFilter: () => React.ReactNode;
    onFilterRemove: () => void;
    isActive: boolean;
  };
};

type TableProps<T> = {
  columns: ColumnConfig<T>[];
  data: T[];
  onClick?: (elem: T) => void;
  keySelector: (elem: T) => string;
  paging?: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    setPageNumber: (pageNumber: number) => void;
    setPageSize: (pageSize: number) => void;
  };
};

export default function Table<T>(props: TableProps<T>) {
  const { columns, data, onClick, keySelector, paging } = props;
  const headers = columns.map((c) => c.title);

  return (
    <div>
      {paging && (
        <Mui.TablePagination
          component="div"
          count={paging.totalCount}
          page={paging.pageNumber - 1}
          onPageChange={(_, pageNumber) => paging.setPageNumber(pageNumber + 1)}
          rowsPerPage={paging.pageSize}
          onRowsPerPageChange={(event) =>
            paging.setPageSize(Number(event.target.value))
          }
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} iš ${count}`
          }
          labelRowsPerPage="Puslapio dydis: "
        />
      )}
      <table className="text-left text-sm text-gray-500">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            {columns.map((c) => (
              <th
                scope="col"
                key={c.title}
                className={`sticky bg-gray-100 py-3 px-6`}
              >
                <div className="flex justify-center text-center align-middle text-sm">
                  {c.title}
                  {c.filter && <TableHeaderFilter {...c.filter} />}
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
                  <div className="flex items-center justify-center text-center align-middle">
                    {c.renderCell(elem)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type PropsTwo = {
  renderFilter: () => React.ReactNode;
  isActive: boolean;
  onFilterRemove: () => void;
};

function TableHeaderFilter({
  renderFilter,
  isActive,
  onFilterRemove,
}: PropsTwo) {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <Icons.FilterAlt
        className={`${isActive ? 'text-green-700' : 'text-gray-200'}`}
      />
      <Mui.Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
        }}
      >
        <div>{renderFilter()}</div>
        <div>
          <Icons.Remove onClick={() => onFilterRemove()} />
        </div>
      </Mui.Menu>
    </>
  );
}
