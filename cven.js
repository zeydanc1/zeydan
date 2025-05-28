function downloadPDF() {
    const pdfPath = 'ZeydanCV.pdf'; 
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'zeydanCV_EN.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }