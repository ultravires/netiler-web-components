import { getDocument, GlobalWorkerOptions, renderTextLayer } from 'pdfjs-dist';
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';
import BaseComponent from '@packages/base';
import style from './pdf_viewer.css' assert { type: 'css' };

export default class NtButton extends BaseComponent {
  static componentName = 'nt-pdf-viewer';

  static get observedAttributes() {
    return ['file'];
  }

  constructor() {
    super();
    this.adoptStyleSheet( style );
  }

  get file() {
    return this.getAttribute('file');
  }

  set file(file) {
    this.setAttribute('file', file);
  }

  get scale() {
    return +Number(this.getAttribute('scale')).toFixed(1) || 1;
  }

  set scale(scale) {
    this.setAttribute('scale', scale);
  }

  connectedCallback() {
    this.render();

    const shadowRoot = this.shadowRoot;
    const viewer = this.shadowRoot.getElementById('viewer');
    let pdf = null;
    const PDF_FILE = this.file;

    GlobalWorkerOptions.workerSrc = pdfWorker;
    const loadingTask = getDocument({
      url: PDF_FILE,
      cMapUrl: './cmaps',
      cMapPacked: true,
      enableXfa: true
    });
    loadingTask.promise.then((_pdf) => {
      pdf = _pdf;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const num = Number.parseInt(entry.target.dataset.pageNumber);
            console.log(`Ready render page ${num}`);
            renderPage(num);
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.0
      });
      for(let num = 1; num <= pdf.numPages; num++) {
        const page = createEmptyPage(num);
        viewer.appendChild(page);
        observer.observe(page);
      }
    });

    function createEmptyPage(num) {
      const page = document.createElement('div');
      page.setAttribute('id', `pageContainer${num}`);
      page.setAttribute('data-loaded', false);
      page.setAttribute('data-page-number', num);
      page.className = 'page';
      const canvas = document.createElement('canvas');
      canvas.setAttribute('id', `page${num}`);
      const wrapper = document.createElement('div');
      wrapper.className = 'canvasWrapper';
      wrapper.appendChild(canvas);
      const textLayer = document.createElement('div');
      textLayer.setAttribute('id', `textLayer${num}`);
      textLayer.className = 'textLayer';
      page.appendChild(wrapper);
      page.appendChild(textLayer);
      return page;
    }

    function renderPage(num) {
      pdf.getPage(num).then((_page) => {
        const page = viewer.querySelector(`#pageContainer${num}`);
        const canvas = page.querySelector(`#page${num}`);
        const textLayer = page.querySelector(`#textLayer${num}`);

        // load page
        const unscaledViewport = _page.getViewport({ scale: 1.0 });
        const DEFAULT_SCALE = page.offsetWidth / unscaledViewport.width;
        const outputScale = window.devicePixelRatio || 1;
        const viewport = _page.getViewport({ scale: DEFAULT_SCALE * outputScale });
        const canvasContext = canvas.getContext('2d');
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.style.height = Math.floor(viewport.height) + 'px';
        canvas.style.width = Math.floor(viewport.width) + 'px';
        const renderContext = {
          canvasContext,
          viewport
        };
        const renderTask = _page.render(renderContext);
        renderTask.promise.then(() => {
          return _page.getTextContent();
        }).then((textContent) => {
          textLayer.style.left = canvas.offsetLeft + 'px';
          textLayer.style.top = canvas.offsetTop + 'px';
          textLayer.style.height = canvas.offsetHeight + 'px';
          textLayer.style.width = canvas.offsetWidth + 'px';

          renderTextLayer({
            textContent,
            textContentSource: textContent,
            container: textLayer,
            viewport: viewport,
            textDivs: []
          });

          page.setAttribute('data-loaded', true);
        });
      }, (reason) => {
        console.error(reason);
      });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `<div id="viewer" class="pdfViewer"></div>`;
  }
}
