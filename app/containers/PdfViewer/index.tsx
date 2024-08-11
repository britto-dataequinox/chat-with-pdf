"use client";

import { Button } from "@/components/ui/button";
import {
  Loader2Icon,
  RotateCcw,
  ZoomInIcon,
  ZoomOutIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Grid, Tooltip } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<Blob | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(url);
      const file = await response.blob();
      setFile(file);
    };
    fetchFile();
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className="sticky top-0 z-50 bg-gradient-to-r from-red-500 to-white p-2 rounded-b-lg">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item style={{ margin: "0 8px" }}>
            <Tooltip title="Previous Page">
              <Button
                variant="outline"
                disabled={pageNumber === 1}
                onClick={() => {
                  if (pageNumber > 1) {
                    setPageNumber(pageNumber - 1);
                  }
                }}
              >
                <ChevronLeft />
              </Button>
            </Tooltip>
          </Grid>
          <Grid item style={{ margin: "0 8px", textAlign: "center" }}>
            <p>
              {pageNumber} of {numPages}
            </p>
          </Grid>
          <Grid item style={{ margin: "0 8px" }}>
            <Tooltip title="Next Page">
              <Button
                variant="outline"
                disabled={pageNumber === numPages}
                onClick={handleNextPage}
              >
                <ChevronRight />
              </Button>
            </Tooltip>
          </Grid>
          <Grid item style={{ margin: "0 8px" }}>
            <Tooltip title="Rotate">
              <Button
                variant="outline"
                onClick={() => setRotation((rotation + 90) % 360)}
              >
                <RotateCcw />
              </Button>
            </Tooltip>
          </Grid>
          <Grid item style={{ margin: "0 8px" }}>
            <Tooltip title="Zoom In">
              <Button
                variant="outline"
                disabled={scale >= 1.5}
                onClick={() => setScale(scale * 1.2)}
              >
                <ZoomInIcon />
              </Button>
            </Tooltip>
          </Grid>
          <Grid item style={{ margin: "0 8px" }}>
            <Tooltip title="Zoom Out">
              <Button
                variant="outline"
                disabled={scale <= 0.75}
                onClick={() => setScale(scale / 1.2)}
              >
                <ZoomOutIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </div>

      {!file ? (
        <Loader2Icon className="animate-spin h-20 w-20 text-red-600 mt-20" />
      ) : (
        <Box mt={4}>
          <Box
            sx={{
              maxHeight: "75vh", // Adjust for larger screens
              overflowY: "scroll",
              background:
                "linear-gradient(to bottom, rgba(255, 0, 0, 0.8), rgba(255, 255, 255, 0.8))",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background:
                  "linear-gradient(to bottom, rgba(255, 0, 0, 0.8), rgba(255, 255, 255, 0.8))",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "white",
              },
            }}
          >
            <Document
              loading={null}
              file={file}
              rotate={rotation}
              onLoadSuccess={onDocumentLoadSuccess}
              className={"shadow-lg"}
            >
              <Page
                className={"shadow-lg"}
                scale={scale}
                pageNumber={pageNumber}
              />
            </Document>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default PdfViewer;
