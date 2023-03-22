import JsPDF from 'jspdf'
import html2Canvas from 'html2canvas'

// 页面截图生成pdf (伪代码)

function exportPDF() {
    // 1、生成 下载 pdf 文件 2、保存数据
    const el = document.getElementById('container')
    html2Canvas(el, { scale: 1.3, dpi: 144, }).then(canvas => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = (contentWidth / 592.28) * 841.89
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight
        // 页面偏移
        let position = 0
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 595.28
        const imgHeight = (592.28 / contentWidth) * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)

        const PDF = new JsPDF('', 'pt', 'a4')

        if (leftHeight < pageHeight) {
            // addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
            // 超过一页时，分页打印（每页高度841.89）
            while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                    PDF.addPage()
                }
            }
        }
        const fileName = `${'文件名称'}.pdf`
        // 下载 PDF
        PDF.save(fileName)

        // 保存 PDF （上传到服务器）
        saveData(PDF.output('datauristring'), fileName)

    }).catch((error) => {
        console.log('生成pdf失败，', error)
    })
}

function saveData(base64PDF, fileName) {
    // base64 -> file
    const file = dataUrlToFile(base64PDF, fileName)
    // file -> formdata
    const formdata = new FormData()
    formdata.append('file', file)

    // 接口其他参数
    const editParams = this.$route.params.editParams || {}

    const params = {
        userid: Cookies.get("userid"),
        username: Cookies.get("username"),
        ...editParams
    }

    for (const key in params) {
        formdata.append(key, params[key])
    }

    axios.post(process.env.VUE_APP_BASE_API + '/save_pdf', formdata).then(result => {
        console.log('pdf上传成功！');
    })
}

function dataUrlToFile(dataurl, fileName) {
    let arr = dataurl.split(','),
        mine = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], fileName, { type: mine })
}
