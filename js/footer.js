document.addEventListener('DOMContentLoaded', () => {
  const owner = 'acemavrick';
  const repo = 'PeriodicPursuit';
  const gameGuideSection = document.getElementById('about-section');

  if (!gameGuideSection) {
    console.error('Game guide section (#about-section) not found.');
    return;
  }

  const createStyledSpan = (text, isSemibold, isItalic) => {
    const span = document.createElement('span');
    span.textContent = text;
    if (isSemibold) {
      span.style.fontWeight = '600'; // Semibold
    }
    if (isItalic) {
      span.style.fontStyle = 'italic';
    }
    return span;
  };

  const createDeveloperTextElement = (contributors) => {
    const developerP = document.createElement('p');
    developerP.style.fontSize = '0.8rem'; // Slightly smaller
    developerP.style.marginTop = '0.5rem'; 
    developerP.style.color = '#555'; 
    developerP.style.textAlign = 'center'; // Centered

    developerP.appendChild(createStyledSpan('Developed by ', true, false)); // "Developed by " semibold

    if (contributors && contributors.length > 0) {
      contributors.forEach((contributor, index) => {
        const link = document.createElement('a');
        link.href = contributor.html_url;
        link.textContent = contributor.login;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.color = '#555'; 
        link.style.textDecoration = 'underline'; 
        link.style.fontStyle = 'italic'; // Username italic
        link.style.fontWeight = 'normal'; // Ensure username is not semibold

        developerP.appendChild(link);

        if (index < contributors.length - 2) {
          developerP.appendChild(createStyledSpan(', ', true, false)); // Comma semibold
        } else if (index === contributors.length - 2) {
          developerP.appendChild(createStyledSpan(' & ', true, false)); // Ampersand semibold
        }
      });
      developerP.appendChild(createStyledSpan('.', true, false)); // Period semibold
    } else {
      // Default text if no contributors or error
      const defaultLink = document.createElement('a');
      defaultLink.href = `https://github.com/${owner}`;
      defaultLink.textContent = owner;
      defaultLink.target = '_blank';
      defaultLink.rel = 'noopener noreferrer';
      defaultLink.style.color = '#555';
      defaultLink.style.textDecoration = 'underline';
      defaultLink.style.fontStyle = 'italic'; // Default username italic
      defaultLink.style.fontWeight = 'normal';

      developerP.appendChild(defaultLink);
      developerP.appendChild(createStyledSpan('.', true, false)); // Period semibold
      
      if (!contributors) { // Error case
        console.log('Failed to load contributors. Displaying default.');
      } else { // No contributors found case
         console.log('No contributors found. Displaying default.');
      }
    }
    return developerP;
  };

  fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const validContributors = data.filter(contributor => contributor.type === 'User' && contributor.login);
      const developerElement = createDeveloperTextElement(validContributors);
      gameGuideSection.appendChild(developerElement);
    })
    .catch(error => {
      console.error('Failed to fetch contributors:', error);
      const developerElement = createDeveloperTextElement(null); 
      gameGuideSection.appendChild(developerElement);
    });
});
