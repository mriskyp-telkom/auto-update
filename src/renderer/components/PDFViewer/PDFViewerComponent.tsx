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
      src={`./assets/pdfjs/web/viewer.html?file=${props.file}`}
    />
  )
}

PDFViewerComponent.defaultProps = {
  file: '../../helloworld.pdf',
}

export default PDFViewerComponent
