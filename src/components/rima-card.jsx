import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useState } from 'react';
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { getRimaTypeFromTitle, rimaTypeToCode } from "../utils";


const results = [
  {
    title: "persatuan"
  },
  {
    title: "perampokan"
  },
  {
    title: "sambutan"
  },
  {
    title: "perumahan"
  },
  {
    title: "kebanggaan"
  },
  {
    title: "tersampaikan"
  },
  {
    title: "pengakuan"
  }
]

// type CardProps = React.ComponentProps<typeof Card>

export function RimaCard({ className, ...props }) {
  const { title, description, data } = props;
  const words = data?.length > 0 ? data : results

  const rimaType = getRimaTypeFromTitle(title);
  const rimaTypeCode = rimaTypeToCode[rimaType];

  const { toast } = useToast();
  const [copied, setCopied] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const word = searchParams.get("word")

  const handleCopy = async (id) => {
    await navigator.clipboard.writeText(id)
    toast({ description: "Teks berhasil disalin.", className: "max-w-[225px] bottom-4 absolute right-10" });
    setCopied((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [id]: false })), 2000);
  }

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{title ?? "Rima Akhir Sempurna"}</CardTitle>
        <CardDescription>{description ?? "Persamaan bunyi pada suku kata terakhir"}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Table>
          <TableBody>
            {words.map((w) => (
              <TableRow key={w.title}>
                <TableCell className="text-left">{w.title}</TableCell>
                <TableCell className="text-right flex justify-end">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(w.title)}
                >
                  {copied[w.title] ? <Check size={16}/> : <Copy size={16} />}
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={() => (
            navigate(`/details/${word}/${rimaTypeCode}`
          ))}
        >
          Selengkapnya...
        </Button>
      </CardFooter>
    </Card>
  )
}
