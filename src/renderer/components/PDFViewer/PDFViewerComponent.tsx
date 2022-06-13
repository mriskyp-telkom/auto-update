import React, { FC } from 'react'

interface PDFViewerProps {
  file?: string
}

const PDFViewerComponent: FC<PDFViewerProps> = (props: PDFViewerProps) => {
  return (
    <iframe
      width="100%"
      height="1000px"
      title="PdfViewerHTML"
      style={{ border: 'none' }}
      src={`${props.file}`}
    />
  )
}

PDFViewerComponent.defaultProps = {
  file: `./assets/pdfjs/web/viewer.html?file=../../helloworld.pdf}`,
}

export default PDFViewerComponent
