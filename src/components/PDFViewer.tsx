import { useEffect, useRef, useState } from 'react'
import {
	getDocument,
	GlobalWorkerOptions,
	type PDFDocumentProxy,
	type PDFPageProxy,
} from 'pdfjs-dist'

GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.3.93/pdf.worker.min.js'

interface PDFViewerProps {
	url: string
	initialPage?: number
	scale?: number
}

export function PDFViewer({ url, initialPage = 1, scale = 1 }: PDFViewerProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
	const [numPages, setNumPages] = useState(0)
	const [pageNumber, setPageNumber] = useState(initialPage)

	useEffect(() => {
		getDocument(url).promise.then(doc => {
			setPdf(doc)
			setNumPages(doc.numPages)
			setPageNumber(initialPage)
		}).catch(console.error)
	}, [url, initialPage])

	useEffect(() => {
		if (!pdf || !canvasRef.current) return
		pdf.getPage(pageNumber).then((page: PDFPageProxy) => {
			const viewport = page.getViewport({ scale })
			const canvas = canvasRef.current!
			canvas.width = viewport.width
			canvas.height = viewport.height
			const ctx = canvas.getContext('2d')!
			page.render({ canvasContext: ctx, viewport })
		}).catch(console.error)
	}, [pdf, pageNumber, scale])

	return (
		<div className="pdf-viewer">
			<canvas ref={canvasRef} />
			<div className="toolbar">
				<button onClick={() => setPageNumber(p => Math.max(p - 1, 1))} disabled={pageNumber <= 1}>
					◀ Prev
				</button>
				<span>Page {pageNumber} / {numPages}</span>
				<button onClick={() => setPageNumber(p => Math.min(p + 1, numPages))} disabled={pageNumber >= numPages}>
					Next ▶
				</button>
			</div>
		</div>
	)
}
