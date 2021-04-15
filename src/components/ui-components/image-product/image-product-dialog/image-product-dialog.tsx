import { DropzoneDialog } from 'material-ui-dropzone';
import React from 'react';

type ImageProductDialogType = {
  isOpen: boolean;
  handleClose: any;
  handleSave: any;
};
export default function ImageProductDialog({
  isOpen,
  handleClose,
  handleSave
}: ImageProductDialogType) {
  return (
    <div>
      <DropzoneDialog
        open={isOpen}
        onSave={handleSave}
        dialogTitle='Cargar imagen del producto'
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        previewText='Vista previa'
        dropzoneText='Arrastra y suelta una imagen, o da click aquí'
        filesLimit={1}
      />
    </div>
  );
}
