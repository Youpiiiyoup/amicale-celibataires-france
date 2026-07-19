// Initialize Lucide Icons
lucide.createIcons();

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    if(nav.style.display === 'flex') {
        nav.style.display = 'none';
        mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.backgroundColor = 'white';
        nav.style.padding = '2rem';
        nav.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
    }
    lucide.createIcons();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if(window.innerWidth <= 768 && nav.style.display === 'flex') {
                nav.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            }

            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

/* ==========================================================================
   NEW FEATURES INTERACTIVITY
   ========================================================================== */

// --- Repas Partagés Date Toggle ---
const repasToggleBtn = document.querySelector('.repas-toggle-btn');
const repasDatesList = document.querySelector('.repas-dates-list');

if (repasToggleBtn && repasDatesList) {
    repasToggleBtn.addEventListener('click', () => {
        repasDatesList.classList.toggle('hidden');
        const isHidden = repasDatesList.classList.contains('hidden');
        repasToggleBtn.innerHTML = isHidden 
            ? '<i data-lucide="calendar-days"></i> Voir les dates prévues'
            : '<i data-lucide="calendar-days"></i> Masquer les dates';
        lucide.createIcons();
    });
}

// --- Event Filtering ---
const filterButtons = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        eventCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.classList.remove('filtered-out');
            } else {
                card.classList.add('filtered-out');
            }
        });
    });
});

// --- Inscription Modal Management ---
const registrationModal = document.getElementById('registration-modal');
const modalCloseBtn = document.getElementById('modal-close');
const registrationForm = document.getElementById('event-registration-form');
const eventSelect = document.getElementById('reg-event-select');
const eventOtherText = document.getElementById('event-other-text');

// Form conditional inputs: Age
const ageRadios = document.querySelectorAll('input[name="reg-age"]');
const ageOtherText = document.getElementById('age-other-text');

ageRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.id === 'age-other-radio' && radio.checked) {
            ageOtherText.removeAttribute('disabled');
            ageOtherText.setAttribute('required', 'required');
            ageOtherText.focus();
        } else {
            ageOtherText.setAttribute('disabled', 'disabled');
            ageOtherText.removeAttribute('required');
            ageOtherText.value = '';
        }
    });
});

// Form conditional inputs: Notification
const notifyRadios = document.querySelectorAll('input[name="reg-notify"]');
const notifyOtherText = document.getElementById('notify-other-text');

notifyRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.id === 'notify-other-radio' && radio.checked) {
            notifyOtherText.removeAttribute('disabled');
            notifyOtherText.setAttribute('required', 'required');
            notifyOtherText.focus();
        } else {
            notifyOtherText.setAttribute('disabled', 'disabled');
            notifyOtherText.removeAttribute('required');
            notifyOtherText.value = '';
        }
    });
});

// Form conditional inputs: Event Select
if (eventSelect) {
    eventSelect.addEventListener('change', () => {
        if (eventSelect.value === 'autre') {
            eventOtherText.classList.remove('hidden');
            eventOtherText.setAttribute('required', 'required');
            eventOtherText.focus();
        } else {
            eventOtherText.classList.add('hidden');
            eventOtherText.removeAttribute('required');
            eventOtherText.value = '';
        }
    });
}

// Open modal and pre-select event
document.querySelectorAll('.btn-register').forEach(button => {
    button.addEventListener('click', () => {
        const eventName = button.getAttribute('data-event');
        
        // Reset form
        registrationForm.reset();
        eventOtherText.classList.add('hidden');
        eventOtherText.removeAttribute('required');
        ageOtherText.setAttribute('disabled', 'disabled');
        ageOtherText.removeAttribute('required');
        notifyOtherText.setAttribute('disabled', 'disabled');
        notifyOtherText.removeAttribute('required');
        
        // Set event choice in select
        if (eventName && eventSelect) {
            // Find option in select
            let found = false;
            for (let i = 0; i < eventSelect.options.length; i++) {
                if (eventSelect.options[i].value === eventName) {
                    eventSelect.selectedIndex = i;
                    found = true;
                    break;
                }
            }
            // If not found directly, set as Autre and fill text input
            if (!found) {
                eventSelect.value = 'autre';
                eventOtherText.classList.remove('hidden');
                eventOtherText.setAttribute('required', 'required');
                eventOtherText.value = eventName;
            }
        }

        registrationModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal function
function closeRegistrationModal() {
    registrationModal.classList.remove('open');
    document.body.style.overflow = '';
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeRegistrationModal);
}

// Close on overlay click
if (registrationModal) {
    registrationModal.addEventListener('click', (e) => {
        if (e.target === registrationModal) {
            closeRegistrationModal();
        }
    });
}

// ESC key to close
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && registrationModal && registrationModal.classList.contains('open')) {
        closeRegistrationModal();
    }
});

// --- Toast Notifications ---
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Choose icon based on type
    let icon = 'check-circle-2';
    if (type === 'info') icon = 'info';
    if (type === 'error') icon = 'alert-triangle';

    toast.innerHTML = `
        <i data-lucide="${icon}"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    lucide.createIcons();

    // Remove toast after animation completes (5s total in CSS)
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// --- Submit Registrations ---
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('reg-firstname').value;
        const lastName = document.getElementById('reg-lastname').value;
        
        // Simulate successful submission
        closeRegistrationModal();
        
        setTimeout(() => {
            showToast(`Merci ${firstName} ${lastName}, votre inscription a bien été enregistrée ! Un e-mail de confirmation vous a été envoyé.`, 'success');
        }, 300);
    });
}

// --- Submit Volunteer Candidacy ---
const volunteerForm = document.getElementById('volunteer-form');
if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('vol-firstname').value;
        const lastName = document.getElementById('vol-lastname').value;
        
        volunteerForm.reset();
        
        showToast(`Merci ${firstName} ${lastName} ! Votre candidature de bénévole a été envoyée. Notre coordinateur vous contactera très vite.`, 'success');
    });
}

// --- Newsletter Content Storage & Reader Modal ---
const newsletterModal = document.getElementById('newsletter-modal');
const newsletterCloseBtn = document.getElementById('newsletter-close');
const newsletterReaderContent = document.getElementById('newsletter-reader-content');

const newslettersData = {
    '1': `
        <article class="newsletter-full">
            <h2>Newsletter n°1 — Agir contre l’isolement : comprendre pour mieux agir</h2>
            
            <div class="newsletter-highlight-box">
                <h4>Message clé</h4>
                <p>L’isolement n’est pas seulement une absence de contacts : c’est une perte de repères, de liens, de confiance. Agir, c’est recréer des espaces où chacun peut exister pleinement.</p>
            </div>

            <div class="newsletter-section-block">
                <h3><i data-lucide="help-circle"></i> Comprendre l’isolement</h3>
                <p>L’isolement touche toutes les générations, mais il n’est jamais une fatalité. Il s’explique souvent par :</p>
                <ul>
                    <li>La perte de liens familiaux ou amicaux</li>
                    <li>La solitude en milieu urbain</li>
                    <li>Des fragilités psychologiques ou sociales</li>
                    <li>Le manque d’espaces propices pour aller vers l’autre</li>
                </ul>
            </div>

            <div class="newsletter-section-block">
                <h3><i data-lucide="lightbulb"></i> Ce que nous pouvons faire</h3>
                <ul>
                    <li><strong>Créer des espaces de rencontre :</strong> Développer des jardins partagés, des cafés solidaires et des ateliers conviviaux.</li>
                    <li><strong>Encourager la participation :</strong> Proposer des activités simples, régulières et facilement accessibles à tous.</li>
                    <li><strong>Valoriser chaque personne :</strong> Donner un rôle, une mission ou une place à chacun pour restaurer l'estime de soi.</li>
                    <li><strong>Favoriser les liens intergénérationnels :</strong> Faciliter la transmission, l'entraide et le partage d'expériences entre jeunes et aînés.</li>
                </ul>
            </div>

            <div class="newsletter-section-block">
                <h3><i data-lucide="sprout"></i> Le Jardin SoliTerre : un antidote à l’isolement</h3>
                <p>C'est un lieu unique où l’on cultive des légumes… mais surtout des relations. Un espace chaleureux où chacun peut venir sans prérequis, juste avec l’envie d’être là et de partager.</p>
            </div>

            <div class="newsletter-retenir-box">
                <h4>À retenir</h4>
                <p>L’isolement recule quand on crée des lieux où les gens peuvent se rencontrer naturellement.</p>
            </div>
        </article>
    `,
    '2': `
        <article class="newsletter-full">
            <h2>Newsletter n°2 — 10 actions simples pour lutter contre l’isolement dans votre quartier</h2>
            
            <div class="newsletter-section-block">
                <h3><i data-lucide="check-square"></i> 10 actions concrètes et quotidiennes</h3>
                <ul>
                    <li><strong>Dire bonjour :</strong> Un geste simple et chaleureux qui ouvre la porte au dialogue.</li>
                    <li><strong>Proposer un café :</strong> Partager un moment court qui peut changer le cours d'une journée difficile.</li>
                    <li><strong>Inviter à une activité :</strong> Proposer une marche dans le quartier, une séance de jardinage ou de lecture.</li>
                    <li><strong>Créer un rituel :</strong> Instaurer un rendez-vous mensuel ou une habitude conviviale.</li>
                    <li><strong>Mettre en place un groupe d'échange (WhatsApp...) :</strong> Pour garder le contact au quotidien.</li>
                    <li><strong>Organiser un repas partagé :</strong> Chacun apporte quelque chose, tout le monde repart avec de nouvelles connaissances.</li>
                    <li><strong>Proposer de l’aide pratique :</strong> Accompagnement aux courses, démarches administratives simples ou simple écoute.</li>
                    <li><strong>Créer un coin lecture partagé :</strong> Mettre à disposition des livres en libre accès.</li>
                    <li><strong>Participer à un jardin collectif :</strong> Cultiver la terre ensemble, c’est se relier aux autres.</li>
                    <li><strong>Encourager les initiatives locales :</strong> Soutenir activement les associations et ateliers de votre quartier.</li>
                </ul>
            </div>

            <div class="newsletter-highlight-box">
                <h4>Pourquoi ça marche ?</h4>
                <p>Parce que l’isolement se combat par des gestes simples, répétés et fondamentalement humains. Chacun d'entre nous peut être un point d'appui et de réconfort pour quelqu'un d'autre.</p>
            </div>

            <div class="newsletter-retenir-box">
                <h4>À retenir</h4>
                <p>L’isolement diminue quand le quartier devient un lieu de vie et d'échange, pas seulement un lieu d'habitation.</p>
            </div>
        </article>
    `,
    '3': `
        <article class="newsletter-full">
            <h2>Newsletter n°3 — Le pouvoir des lieux : comment les espaces transforment les relations</h2>
            
            <div class="newsletter-highlight-box">
                <h4>Les lieux créent du lien</h4>
                <p>Un espace chaleureux, ouvert et facilement accessible peut profondément transformer la vie sociale d’un quartier. Les jardins collectifs, les salles de quartier et les cafés associatifs deviennent rapidement des points de rencontre naturels.</p>
            </div>

            <div class="newsletter-section-block">
                <h3><i data-lucide="eye"></i> Ce que nous observons sur le terrain</h3>
                <ul>
                    <li>Les personnes isolées franchissent plus facilement le pas dans un lieu informel et sans engagement.</li>
                    <li>Les activités manuelles (jardinage, bricolage, cuisine) libèrent la parole et facilitent la discussion spontanée.</li>
                    <li>Les espaces extérieurs et naturels rassurent, détendent et apaisent les esprits.</li>
                    <li>Les lieux ouverts permettent de venir "juste pour voir", sans aucune pression d'implication.</li>
                </ul>
            </div>

            <div class="newsletter-section-block">
                <h3><i data-lucide="heart"></i> Le Jardin SoliTerre : un lieu qui relie</h3>
                <p>C'est un espace où l'on peut venir seul et repartir accompagné. On y apprend, on transmet ses connaissances et on partage des moments. Chacun s'y sent utile, même à travers de petites tâches, ce qui favorise l'estime de soi et la confiance en autrui.</p>
            </div>

            <div class="newsletter-section-block">
                <h3><i data-lucide="wrench"></i> Comment créer un lieu qui rassemble ?</h3>
                <ul>
                    <li>Rendre l’espace visuellement accueillant et confortable.</li>
                    <li>Proposer des activités manuelles simples et collectives.</li>
                    <li>Créer des zones dédiées à la discussion et au repos.</li>
                    <li>Valoriser et soutenir les initiatives propres des habitants.</li>
                    <li>Garantir des horaires d'ouverture réguliers pour créer une habitude sociale.</li>
                </ul>
            </div>

            <div class="newsletter-retenir-box">
                <h4>À retenir</h4>
                <p>Un lieu bien pensé devient un véritable remède contre l’isolement, un espace où les liens se tissent spontanément.</p>
            </div>
        </article>
    `
};

document.querySelectorAll('.btn-read-more').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-newsletter');
        const content = newslettersData[id];
        
        if (content && newsletterModal && newsletterReaderContent) {
            newsletterReaderContent.innerHTML = content;
            newsletterModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            lucide.createIcons();
        }
    });
});

function closeNewsletterModal() {
    if (newsletterModal) {
        newsletterModal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

if (newsletterCloseBtn) {
    newsletterCloseBtn.addEventListener('click', closeNewsletterModal);
}

if (newsletterModal) {
    newsletterModal.addEventListener('click', (e) => {
        if (e.target === newsletterModal) {
            closeNewsletterModal();
        }
    });
}

// ESC key to close newsletter modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && newsletterModal && newsletterModal.classList.contains('open')) {
        closeNewsletterModal();
    }
});
