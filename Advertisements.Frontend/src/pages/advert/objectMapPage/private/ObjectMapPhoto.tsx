import React from 'react';
import FileResponse from '../../../../api/responses/type.FileResponse';
import Mui from '../../../../config/imports/Mui';

type Props = {
  image: FileResponse;
};

function ObjectMapPhoto({ image }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex h-full w-full cursor-pointer justify-center hover:opacity-50">
      <img
        onClick={() => setOpen(true)}
        className="max-h-full max-w-full object-scale-down"
        src={`data:${image.mime};base64, ${image.base64}`}
      />
      <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth={false}>
        <img src={`data:${image.mime};base64, ${image.base64}`} />
      </Mui.Dialog>
    </div>
  );
}

export default ObjectMapPhoto;
