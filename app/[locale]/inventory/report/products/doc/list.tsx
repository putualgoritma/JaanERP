'use client';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const ProductDoc = (products: any) => {
  let PizZipUtils: any = null;
  if (typeof window !== "undefined") {
    import("pizzip/utils/index.js").then(function (r) {
      PizZipUtils = r;
    });
  }

  function loadFile(url: string, callback: any) {
    PizZipUtils.getBinaryContent(url, callback);
  }

  const pathname = usePathname()

  const generateDocument = () => {
    let absUrl = window.location.href;
    absUrl = absUrl.replace(pathname, "");
    const productData = products.products.data
    const fileName = "http://localhost:3000//doc-templates/product.docx";
    loadFile(fileName, function (
      error: any,
      content: any
    ) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new Docxtemplater().loadZip(zip);
      doc.setData({
        first_name: "John",
        last_name: "Doe",
        phone: "0652455478",
        description: "New Website",
        collect: productData.map((item : any) => ({
          id: item.id,
          code: item.code,
          email: item.email
        }))
      });
      try {
        doc.render();
      } catch (error) {
        throw error;
      }
      var out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      saveAs(out, "products.docx");
    });
  };
  return (
    <>
      <Link
        href="#this"
        onClick={generateDocument}
        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
          <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
        </svg>
        Export DOC
      </Link>
    </>
  )
}
export default ProductDoc