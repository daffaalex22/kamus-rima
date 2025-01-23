import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useMediaQuery } from "@uidotdev/usehooks";

const DetailDefinition = ({ className, ...props }) => {
  const { selectedEntry, definition, openEntryDetail, setOpenEntryDetail } = props;

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={openEntryDetail} onOpenChange={setOpenEntryDetail}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-3">{selectedEntry}</DialogTitle>
            <DialogDescription
              dangerouslySetInnerHTML={{__html: definition}}
            >
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      open={openEntryDetail}
      onOpenChange={setOpenEntryDetail}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle
            className="text-left italic mb-2"
          >
            {selectedEntry}
          </DrawerTitle>
          <DrawerDescription
            className="text-left"
            dangerouslySetInnerHTML={{__html: definition}}
          >
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Tutup</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DetailDefinition;
