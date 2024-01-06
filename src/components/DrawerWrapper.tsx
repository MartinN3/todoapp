import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function DrawerWrapper() {
  const navigate = useNavigate();
  return (
    <Drawer isOpen={true} size={'xl'} onClose={() => navigate(-1)}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <Outlet />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
