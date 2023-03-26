import React from 'react';
import { FileUpdate } from '../../../../api/commands/primitives/schema.file';
import { UpdateAdvertObject } from '../../../../api/commands/schema.updateAdvertObject';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import RHF from '../../../../config/imports/RHF';

type Props = {
  image: FileUpdate;
  remove: RHF.UseFieldArrayRemove;
  index: number;
  planeIndex: number;
  form: RHF.UseFormReturn<UpdateAdvertObject>;
};

function Photo(props: Props) {
  const { image, remove, index, form, planeIndex } = props;
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const updateStatus = form.watch(
    `planes.${planeIndex}.photos.${index}.updateStatus`,
  );

  const openMenu = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (menuAnchor !== event.currentTarget) {
      setMenuAnchor(event.currentTarget);
    }
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const onRemove = () => {
    if (updateStatus === 'Existing') {
      form.setValue(
        `planes.${planeIndex}.photos.${index}.updateStatus`,
        'Deleted',
      );
      closeMenu();
      return;
    }

    remove(index);
    closeMenu();
  };

  const onDeletedRestore = () => {
    form.setValue(
      `planes.${planeIndex}.photos.${index}.updateStatus`,
      'Existing',
    );
    closeMenu();
  };

  return (
    <div
      className={`flex cursor-pointer border-4 border-opacity-50 shadow-md hover:opacity-50
    ${updateStatus === 'Existing' && ' border-blue-700'}
    ${updateStatus === 'New' && ' border-green-400'}
    ${updateStatus === 'Deleted' && ' border-red-400'}`}
    >
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
          {updateStatus === 'Deleted' ? (
            <Mui.Button color="info" onClick={onDeletedRestore}>
              Anuluoti trinimą <Icons.Restore />
            </Mui.Button>
          ) : (
            <Mui.Button color="error" onClick={onRemove}>
              Ištrinti <Icons.Delete />
            </Mui.Button>
          )}
        </div>
      </Mui.Menu>
      <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth={false}>
        <img src={`data:${image.mime};base64, ${image.base64}`} />
      </Mui.Dialog>
    </div>
  );
}

export default Photo;
