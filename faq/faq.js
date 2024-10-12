document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isVisible = answer.style.display === 'block';

            // Ukrywanie wszystkich odpowiedzi
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');

            // Pokazywanie lub ukrywanie wybranej odpowiedzi
            if (!isVisible) {
                answer.style.display = 'block';
            }
        });
    });
});
