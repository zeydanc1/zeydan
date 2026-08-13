function downloadPDF() {
    const pdfPath = 'zeydanCV_TR.pdf'; 
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'zeydanCV_TR.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }