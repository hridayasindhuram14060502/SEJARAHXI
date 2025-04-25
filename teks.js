$(document).ready(function () {
    /*
     * Main variables
     */
    var content = [
        {
        title: "Pendudukan Jepang di Indonesia (Hindia Belanda)",
        desc: "Jepang menduduki Indonesia (1942-1945) dan memanfaatkan sumber daya serta tenaga kerja melalui sistem kerja paksa (Romusha). Mereka membentuk organisasi seperti PETA dan Heiho serta menjanjikan kemerdekaan dengan membentuk BPUPKI dan PPKI. Jepang juga membatasi pendidikan, memaksakan budaya mereka, tetapi justru memperkuat nasionalisme Indonesia. Berbagai perlawanan terjadi, seperti Pemberontakan PETA di Blitar (1945). Setelah Jepang menyerah pada 15 Agustus 1945, Indonesia segera memproklamasikan kemerdekaan."
    }, 
    {
        title: "Peristiwa Sekitar Proklamasi Kemerdekaan Indonesia",
        desc: "Perang Pasifik melemahkan Jepang, yang akhirnya membentuk BPUPKI dan PPKI untuk membahas kemerdekaan. Setelah bom atom dijatuhkan di Hiroshima dan Nagasaki, Jepang menyerah pada 15 Agustus 1945. Golongan muda mendesak proklamasi segera, yang berujung pada Peristiwa Rengasdengklok. Setelah kesepakatan, Soekarno dan Hatta menyusun naskah proklamasi dan membacakannya pada 17 Agustus 1945. Berita proklamasi kemudian disebarkan ke seluruh Indonesia meskipun dihalangi Jepang."
    }, 
    {
        title: "Pembentukan Pemerintahan Indonesia dalam Sidang PPKI (18-22 Agustus 1945)",
        desc: "Sidang PPKI menetapkan UUD 1945, mengangkat Soekarno-Hatta sebagai presiden dan wakil presiden, serta membentuk KNIP sebagai badan legislatif sementara. Indonesia dibagi menjadi 8 provinsi dengan 12 kementerian. PPKI juga merancang pembentukan TKR sebagai cikal bakal TNI serta membahas pendirian PNI sebagai partai tunggal, meskipun tidak direalisasikan."
    }, 
    {
        title: "Dukungan dan Reaksi Rakyat terhadap Proklamasi Kemerdekaan",
        desc: "Rakyat menyambut proklamasi dengan aksi spontan seperti pengibaran bendera dan pencoretan simbol Jepang. Di berbagai daerah, mereka melucuti senjata tentara Jepang dan mengambil alih aset-aset penting seperti gedung pemerintahan dan stasiun radio. Perlawanan ini menunjukkan kesiapan rakyat mempertahankan kemerdekaan."
    }, 
    {
        title: "Sistem Pemerintahan Indonesia pada Masa Awal Kemerdekaan",
        desc: "Indonesia awalnya menerapkan sistem presidensial dengan presiden sebagai kepala negara dan kepala pemerintahan. KNIP berfungsi sebagai badan legislatif sementara. Pada 14 November 1945, sistem berubah menjadi parlementer dengan perdana menteri memegang kendali pemerintahan."
    }, 
    {
        title: "Proklamasi Kemerdekaan dan Perang Dunia II",
        desc: "Perang Dunia II terjadi di Eropa dan Pasifik. Di Eropa, Jerman menyerah pada Mei 1945, sementara di Pasifik, Jepang menyerah setelah bom atom dijatuhkan di Hiroshima dan Nagasaki. Kekosongan kekuasaan ini dimanfaatkan oleh Indonesia untuk memproklamasikan kemerdekaan pada 17 Agustus 1945."
    }
];
    var currentPage = 0;
    //generate content
    for (var i = 0; i < content.length; i++) {
        //split content letters to array
        for (var obj in content[i]) {
            //if string
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            //if array (grouped text)
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        //set text to 
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
        //clone to data
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }
    //initial arrangement
    arrangeCurrentPage();
    scrambleOthers();
    /*
     * Event handlers
     */
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function () {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-next").click(function () {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    /*
     * Functions
     */
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {
            $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            //don't scramble currentPage
            if (currentPage === i)
                continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            //apply to .title h1s and .desc ps
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {
                    //define random position on screen
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    //defining boundaries
                    var offset = $(".position-data").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
                    //finally, apply all the scrambles
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#DDD",
                        zIndex: "initial"
                    });
                }
            }
        }
    }
});