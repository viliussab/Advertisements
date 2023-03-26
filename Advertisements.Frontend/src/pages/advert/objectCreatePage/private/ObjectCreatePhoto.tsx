import React from 'react';
import { FileCreate } from '../../../../api/commands/primitives/schema.file';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import RHF from '../../../../config/imports/RHF';

type Props = {
  image: FileCreate;
  remove: RHF.UseFieldArrayRemove;
  index: number;
};

function ObjectCreatePhoto({ image, remove, index }: Props) {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const openMenu = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (menuAnchor !== event.currentTarget) {
      setMenuAnchor(event.currentTarget);
    }
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <div className="flex cursor-pointer hover:opacity-50">
      <img
        onClick={openMenu}
        className="h-auto w-auto"
        src={`data:${image.mime};base64, ${image.base64}`}
      />
      <Mui.Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        MenuListProps={{ onMouseLeave: closeMenu }}
      >
        <div className="flex gap-2 pl-2 pr-2">
          <Mui.Button onClick={() => setOpen(true)}>
            Peržiūrėti <Icons.Photo />
          </Mui.Button>
          <Mui.Button color="error" onClick={() => remove(index)}>
            Ištrinti <Icons.Delete />
          </Mui.Button>
        </div>
      </Mui.Menu>
      <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth={false}>
        <img src={`data:${image.mime};base64, ${image.base64}`} />
      </Mui.Dialog>
    </div>
  );
}

export default ObjectCreatePhoto;
