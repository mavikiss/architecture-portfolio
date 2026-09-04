/* =========================================================
   ÁUREA ARQUITETURA
   JavaScript principal
   Projeto fictício — MAVIA FORMA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER
    ========================= */

    const header = document.querySelector(".site-header");

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================
       MENU MOBILE
    ========================= */

    const menuButton =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");


    const closeMenu = () => {

        if (!mobileMenu || !menuButton) return;

        mobileMenu.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );
    };


    const openMenu = () => {

        if (!mobileMenu || !menuButton) return;

        mobileMenu.classList.add("open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );
    };


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.contains(
                        "open"
                    );

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            }
        );
    }


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* =========================
       ESC FECHA MENU
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =========================
       GALERIA
    ========================= */

    const filters =
        document.querySelectorAll(
            "[data-filter]"
        );

    const galleryItems =
        document.querySelectorAll(
            "[data-category]"
        );


    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                filter.classList.add(
                    "active"
                );


                const category =
                    filter.dataset.filter;


                galleryItems.forEach(item => {

                    const itemCategory =
                        item.dataset.category;


                    if (
                        category === "todos" ||
                        category === itemCategory
                    ) {

                        item.hidden = false;

                    } else {

                        item.hidden = true;

                    }

                });

            }
        );

    });


    /* =========================
       FORMULÁRIO
    ========================= */

    const form =
        document.querySelector(
            "#contact-form"
        );

    const formMessage =
        document.querySelector(
            "#form-message"
        );


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (!form.checkValidity()) {

                    form.reportValidity();

                    return;

                }


                if (formMessage) {

                    formMessage.textContent =
                        "Obrigado pelo contato. Esta é uma demonstração de formulário.";

                    formMessage.classList.add(
                        "show"
                    );

                }


                form.reset();

            }
        );

    }


    /* =========================
       LINKS COM ANCHOR
    ========================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        targetId === "#"
                    ) {

                        event.preventDefault();

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        });

});