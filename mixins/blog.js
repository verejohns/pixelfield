export default {
  data() {
    return {
      filteredContent: "",
    };
  },
  methods: {
    initContent() {
      this.filteredContent = this.article.content;
      this.replaceBlogRows();
    },
    replaceBlogRows() {
      for (const i in this.article.blogrow_set) {
        const row = this.article.blogrow_set[i];
        console.log("row", row);
        const regex = new RegExp(`\\[blog_row ${row.id}]`, "mig");
        const subst = this._row(row);
        console.log("subset", subst);
        this.filteredContent = this.filteredContent.replaceAll(regex, subst);
      }
    },
    replaceBack() {
      const regex = /\[back]/gim;
      const subst =
        '<a href="#" onclick="window.history.go(-1); return false;">Zpět</a>';
      console.log("subset", subst);
      this.filteredContent = this.filteredContent.replaceAll(regex, subst);
    },
    replaceYoutube() {
      const regex = /\[youtube ([A-Za-z0-9_\\-]{11})\]/gim;
      const subst =
        '<div class="youtube"><iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" src="https://www.youtube.com/embed/$1" height="497" width="884"></iframe></div>';
      console.log("subset", subst);
      this.filteredContent = this.filteredContent.replaceAll(regex, subst);
    },
    processAttachments() {
      if (this.article.blogattachment_set.length !== 0) {
        this.filteredContent += "<p><strong>Přílohy:</strong><br>";
        for (let i = 0; i < this.article.blogattachment_set.length; i++) {
          const attch = this.article.blogattachment_set[i];
          this.filteredContent += `<a href="${attch.file}" target="_blank">${attch.name}</a><br>`;
        }
        this.filteredContent += "</p>";
      }
    },
    _row(row) {
      return `<div class="article-row"><img src="${row.image}" style="max-width: ${row.left_col_width}; flex-basis: ${row.left_col_width};" /><div class="article-row-col">${row.content}</div></div>`;
    },
  },
  computed: {
    content() {
      this.initContent();
      this.replaceBack();
      this.replaceYoutube();
      this.processAttachments();
      return this.filteredContent;
    },
  },
};
