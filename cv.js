function downloadPDF() {
  const element = document.body; 
  const opt = {
    margin:       0.5,
    filename:     'Zeydan_CV.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
