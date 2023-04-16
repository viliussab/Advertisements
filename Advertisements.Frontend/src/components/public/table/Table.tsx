import React from 'react';
import Mui from '../../../config/imports/Mui';
import TableHeaderFilter from './TableHeaderFilter';

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
  renderOnClickMenu?: (elem: T) => React.ReactNode;
  rowsProps?: {
    onMouseOver?: (elem: T) => void;
    onMouseOut?: (elem: T) => void;
  };
  keySelector: (elem: T) => string;
  paging?: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    setPageNumber: (pageNumber: number) => void;
    setPageSize: (pageSize: number) => void;
  };
};

type TableRowProps<T> = {
  columns: ColumnConfig<T>[];
  renderOnClickMenu?: (elem: T) => React.ReactNode;
  onClick?: (elem: T) => void;
  rowsProps?: {
    onMouseOver?: (elem: T) => void;
    onMouseOut?: (elem: T) => void;
  };
  elem: T;
};

function TableRow<T>(props: TableRowProps<T>) {
  const { rowsProps, elem, renderOnClickMenu, onClick, columns } = props;

  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <tr
        onMouseOver={() =>
          rowsProps?.onMouseOver && rowsProps.onMouseOver(elem)
        }
        onMouseOut={() => rowsProps?.onMouseOut && rowsProps.onMouseOut(elem)}
        onClick={(e) => {
          renderOnClickMenu && setMenuAnchor(e.currentTarget);
          onClick && onClick(elem);
        }}
        className={`nth border-b
      ${
        (onClick || renderOnClickMenu) &&
        'hover:cursor-pointer hover:bg-blue-100'
      }`}
      >
        {columns.map((c) => (
          <td key={c.key} className="py-1 px-1">
            <div className="flex items-center justify-center text-center align-middle">
              {c.renderCell(elem)}
            </div>
          </td>
        ))}
      </tr>
      {renderOnClickMenu && (
        <Mui.Menu
          PaperProps={{
            elevation: 0,
          }}
          MenuListProps={{
            sx: {
              p: 0,
            },
          }}
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => {
            setMenuAnchor(null);
          }}
        >
          <div className="border">{renderOnClickMenu(elem)}</div>
        </Mui.Menu>
      )}
    </>
  );
}

export default function Table<T>(props: TableProps<T>) {
  const {
    columns,
    data,
    onClick,
    keySelector,
    paging,
    rowsProps,
    renderOnClickMenu,
  } = props;

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
            <TableRow<T>
              columns={columns}
              key={keySelector(elem)}
              elem={elem}
              renderOnClickMenu={renderOnClickMenu}
              onClick={onClick}
              rowsProps={rowsProps}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
