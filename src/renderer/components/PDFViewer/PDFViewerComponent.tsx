import React, { FC } from 'react'

interface PDFViewerProps {
  file?: string
}

const PDFViewerComponent: FC<PDFViewerProps> = (props: PDFViewerProps) => {
  return (
    <div className="h-screen px-10">
        <iframe
          width="100%"
          height="100%"
          title="PdfViewerHTML"
          style={{ border: 'none' }}
          src={`./assets/pdfjs/web/viewer.html?file=${props.file}`}
        />
      </div>
  )
}

PDFViewerComponent.defaultProps = {
  file: '../../helloworld.pdf',
}


export default PDFViewerComponent


