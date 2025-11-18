function downloadPDF() {
    const pdfPath = 'zeydanCV_EN.pdf'; 
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'zeydanCV_EN.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }