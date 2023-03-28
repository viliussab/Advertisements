import React from 'react';
import { FileCreate } from '../../../../api/commands/primitives/schema.file';
import FileResponse from '../../../../api/responses/type.FileResponse';
import Icons from '../../../../config/imports/Icons';
import Mui from '../../../../config/imports/Mui';
import RHF from '../../../../config/imports/RHF';

type Props = {
  image: FileResponse;
};

function ObjectMapPhoto({ image }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex cursor-pointer hover:opacity-50">
      <img
        onClick={() => setOpen(true)}
        className="h-auto w-auto"
        src={`data:${image.mime};base64, ${image.base64}`}
      />
      <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth={false}>
        <img src={`data:${image.mime};base64, ${image.base64}`} />
      </Mui.Dialog>
    </div>
  );
}

export default ObjectMapPhoto;
