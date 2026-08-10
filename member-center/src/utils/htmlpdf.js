import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
/**
 * @param  node          要生成 pdf 的DOM元素（容器）
 * @param  padfName    PDF文件生成后的文件名字
 * */
//主要代码
function downloadPDF(node, printHide, padfName) {
  window.pageYoffset = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const el = document.querySelector(node); // 整个导出节点
  return new Promise((resolve, reject) => {
    const ele = document.querySelector(node);
    let eleW = ele.offsetWidth; // 获得该容器的宽
    let eleH = ele.offsetHeight; // 获得该容器的高
    let eleOffsetTop = ele.offsetTop; // 获得该容器到文档顶部的距离
    let eleOffsetLeft = ele.offsetLeft; // 获得该容器到文档最左的距离
    var canvas = document.createElement("canvas");
    let scaleBy = window.devicePixelRatio > 1 ? window.devicePixelRatio : 1;
    canvas.width = eleW * 2; // 将画布宽&&高放大两倍
    canvas.height = eleH * 2;
    var context = canvas.getContext("2d");
    context.scale(2, 2);
    //  context.translate(-offsetLeft - abs, -offsetTop);
    var opts = {
      // canvas: canvas,
      // logging :true,
      // dpi: 300,
      // scale: window.devicePixelRatio * 2,
      scale: 2, //解决pdf不清晰问题
      width: eleW,
      height: eleH,
      useCORS: true,
      background: "#FFF",
      allowTaint: false,
      dpi: window.devicePixelRatio * 2,
      ignoreElements: (element) => {
        if (element.id === printHide)
          return true;
      },
    };
 
    html2Canvas(el, opts).then((canvas) => {
      var pdf = new JsPDF("p", "mm", "a4"); //A4纸，纵向
      var ctx = canvas.getContext("2d"),
        a4w = 200,
        a4h = 287, //A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
        imgHeight = Math.floor((a4h * canvas.width) / a4w), //按A4显示比例换算一页图像的像素高度
        renderedHeight = 0;
      while (renderedHeight < canvas.height) { //截取的高度小于html高度时
        var page = document.createElement("canvas");
        page.width = canvas.width;
        page.height = Math.min(imgHeight, canvas.height - renderedHeight); //可能内容不足一页
        //用getImageData剪裁指定区域，并画到前面创建的canvas对象中
        page
          .getContext("2d")
          .putImageData(
            ctx.getImageData(
              0,
              renderedHeight,
              canvas.width,
              Math.min(imgHeight, canvas.height - renderedHeight)
            ),
            0,
            0
          );
        pdf.addImage(
          page.toDataURL("image/jpeg", 1.0),
          "JPEG",
          5,
          5,
          a4w,
          Math.min(a4h, (a4w * page.height) / page.width)
        ); //添加图像到页面，保留10mm边距
        renderedHeight += imgHeight;
        if (renderedHeight < canvas.height) {
          pdf.addPage(); //如果后面还有内容，添加一个空页
        }
        // delete page;
      }
      //保存文件
      try {
        pdf.save(padfName + ".pdf");
        window.open(pdf.output('bloburl'))
        window.close();
        resolve();
      } catch (error) {
        reject();
      }
    });
  });
}
export default {
  downloadPDF
}