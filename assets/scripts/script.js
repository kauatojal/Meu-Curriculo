document.addEventListener('DOMContentLoaded', function () {
    const menubar = document.querySelector('#menu');
    const Navbar = document.querySelector('.navbar');
    menubar.onclick = () => {
        menubar.classList.toggle('bx-x');
        Navbar.classList.toggle('active');
    }

    const section = document.querySelectorAll('section');
    const navlink = document.querySelectorAll('header nav a');
    window.onscroll = () => {
        section.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');
            if (top > offset && top < offset + height) {
                sec.classList.add('start-animation');
                navlink.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });
        var header = document.querySelector('.header');
        header.classList.toggle('sticky', window.scrollY > 100);
        menubar.classList.remove('bx-x');
        Navbar.classList.remove('active');
    }

    document.getElementById('backToTop').addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function () {
        const backToTopButton = document.getElementById('backToTop');
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    window.addEventListener('scroll', function () {
        const button = document.querySelector('.btn');
        if (window.scrollY > 300) {
            button.classList.add('show-btn');
        } else {
            button.classList.remove('show-btn');
        }
    });

    // Inicializando o EmailJS com a sua chave pública
    emailjs.init("etN9nKcU-6xqOc7nd");

    // Selecionando o formulário e a mensagem de sucesso
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');  // Novo elemento de mensagem de erro

    // Função para validar email
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,6}$/;
        return emailPattern.test(email);
    }

    // Função para enviar o formulário via EmailJS
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

        // Coletando os dados do formulário
        const userName = document.getElementById('user_name').value;
        const userEmail = document.getElementById('user_email').value;
        const userSubject = document.getElementById('user_subject').value;
        const userMessage = document.getElementById('contact__message').value;

        // Validação de email
        if (!validateEmail(userEmail)) {
            alert("Por favor, insira um email válido.");
            return; // Impede o envio do formulário se o email for inválido
        }

        // Enviando o email via EmailJS
        emailjs.send('service_ixngxn3', 'template_bovu75u', {
            from_name: userName,
            from_email: userEmail,
            subject: userSubject,
            message: userMessage
        })
            .then(function (response) {
                console.log('Success!', response);
                successMessage.style.display = 'block'; // Exibe a mensagem de sucesso
                errorMessage.style.display = 'none';  // Esconde a mensagem de erro
                form.reset(); // Limpa o formulário após o envio
            })
            .catch(function (error) {
                console.error('Error:', error);
                errorMessage.style.display = 'block';  // Exibe a mensagem de erro
                successMessage.style.display = 'none'; // Esconde a mensagem de sucesso
            });
    });

    const textElement = document.getElementById('typing-text');
    const texts = ["Desenvolvedor de Software", "Desenvolvedor Full-Stack", "Web Designer", "Universitário", "Flamenguista", "Gamer", "Entusiasta dos E-Sports"];
    let currentTextIndex = 0;
    let index = 0;
    let isTyping = true;

    function typeAndErase() {
        const currentText = texts[currentTextIndex];

        if (isTyping) {
            if (index < currentText.length) {
                textElement.textContent += currentText.charAt(index);
                index++;
            } else {
                isTyping = false;
            }
        } else {
            if (index > 0) {
                textElement.textContent = currentText.substring(0, index - 1);
                index--;
            } else {
                isTyping = true;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
            }
        }
    }

    setInterval(typeAndErase, 120);
});

let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.column');
    const totalSlides = slides.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}
