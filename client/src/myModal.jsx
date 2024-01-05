import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => (
  <Dialog.Root open={isOpen} onOpenChange={onClose}>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Close>
        <Cross1Icon />
      </Dialog.Close>
      {children}
    </Dialog.Content>
  </Dialog.Root>
);

export default Modal;
