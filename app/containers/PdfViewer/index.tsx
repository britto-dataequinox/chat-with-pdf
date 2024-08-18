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
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.2);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  };

  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  return (
    <Box sx={{ height: "85vh", overflow: "auto" }}>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <CardHeader
          title={""}
          action={
            <>
              <Tooltip title="Previous Page">
                <IconButton onClick={handlePrevPage} disabled={pageNumber <= 1}>
                  <ChevronLeft />
                </IconButton>
              </Tooltip>
              <Tooltip title="Next Page">
                <IconButton
                  onClick={handleNextPage}
                  disabled={numPages ? pageNumber >= numPages : true}
                >
                  <ChevronRight />
                </IconButton>
              </Tooltip>
              <Tooltip title="Zoom In">
                <IconButton onClick={handleZoomIn}>
                  <ZoomInIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Zoom Out">
                <IconButton onClick={handleZoomOut} disabled={scale <= 0.5}>
                  <ZoomOutIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Rotate">
                <IconButton onClick={handleRotate}>
                  <RotateCcw />
                </IconButton>
              </Tooltip>
            </>
          }
        />
        <CardContent
          className="custom-scrollbar"
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={scale} rotate={rotation} />
          </Document>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Page {pageNumber} of {numPages}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PdfViewer;
