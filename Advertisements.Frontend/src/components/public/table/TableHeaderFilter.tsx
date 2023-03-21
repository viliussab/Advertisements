import React from 'react';
import Icons from '../../../config/imports/Icons';
import Mui from '../../../config/imports/Mui';

type Props = {
  renderFilter: () => React.ReactNode;
  isActive: boolean;
  onFilterRemove: () => void;
};

function TableHeaderFilter({ renderFilter, isActive, onFilterRemove }: Props) {
  const [menuAnchor, setMenuAnchor] = React.useState<null | SVGSVGElement>(
    null,
  );

  return (
    <>
      <Icons.FilterAlt
        onClick={(event) => setMenuAnchor(event.currentTarget)}
        className={`${isActive ? 'text-green-600' : 'text-gray-700'}`}
      />
      <Mui.Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
        }}
      >
        <div className="flex items-center gap-2 px-2">
          <div className="w-40">{renderFilter()}</div>
          <div className="cursor-pointer">
            <Icons.Clear
              onClick={() => {
                onFilterRemove();
                setMenuAnchor(null);
              }}
            />
          </div>
        </div>
      </Mui.Menu>
    </>
  );
}

export default TableHeaderFilter;
