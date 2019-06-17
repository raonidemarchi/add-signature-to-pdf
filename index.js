const HummusRecipe = require('hummus-recipe')
const uniqid = require('uniqid')

const uniquePDFName = uniqid();
const signaturePdfPath = './temp/' + uniquePDFName + '.pdf'
const outputPath = './outputs/' + uniquePDFName + '.pdf'
const signaturePDF = new HummusRecipe('new', signaturePdfPath)
const pdfDoc = new HummusRecipe('raoni_costa_demarchi.pdf', outputPath)
const pageWidth = pdfDoc.metadata['1'].width
const pageHeight = pdfDoc.metadata['1'].height

const createTemporarySignaturePDF = () => new Promise((resolve, reject) => {
  signaturePDF
    .createPage(pageWidth, pageHeight)
    .image('signature.jpg', 20, 40, {
      width: 300,
      keepAspectRatio: true
    })
    .endPage()
    .endPDF(resolve())
})

const appendSignaturePDFToDocument = () => new Promise((resolve, reject) => {
  pdfDoc
    .appendPage(signaturePdfPath)
    .endPDF(resolve())
})

const init = async () => {
  await createTemporarySignaturePDF()
  await appendSignaturePDFToDocument()
}

init()