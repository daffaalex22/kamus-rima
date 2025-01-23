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
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useMediaQuery } from "@uidotdev/usehooks";
import { SquareArrowOutUpRight } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

const DetailDefinition = ({ className, ...props }) => {
  const { 
    selectedEntry, 
    definition, 
    openEntryDetail, 
    setOpenEntryDetail,
    loading
  } = props;

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const hasDefinition = definition && !loading;

  if (isDesktop) {
    return (
      <Dialog open={openEntryDetail} onOpenChange={setOpenEntryDetail}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-3">{selectedEntry}</DialogTitle>
            {hasDefinition ?
              <DialogDescription
                dangerouslySetInnerHTML={{__html: definition}}
              /> : 
              <DialogDescription>
                {loading ? 
                  <>
                    <Skeleton className="h-4 w-full mb-1.5"/>
                    <Skeleton className="h-4 w-full mb-1.5"/>
                    <Skeleton className="h-4 w-full mb-1.5"/>
                    <Skeleton className="h-4 w-1/2"/>
                  </> :
                  <i>Pratinjau definisi tidak tersedia. <br />
                  Buka laman KBBI untuk meninjau definisi lengkap.</i>
                }
              </DialogDescription>
            }
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {window.open(`https://kbbi.kemdikbud.go.id/entri/${selectedEntry}`, '_blank');}}
            >
              <SquareArrowOutUpRight />
              Buka laman KBBI
            </Button>
          </DialogFooter>
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
        <Button
          onClick={() => {window.open(`https://kbbi.kemdikbud.go.id/entri/${selectedEntry}`, '_blank');}}
        >
          <SquareArrowOutUpRight />
          Buka laman KBBI
        </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DetailDefinition;
