(() => {
  const encode = data => new URLSearchParams(data).toString();
  const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  document.querySelectorAll('[data-demo-feedback]').forEach(form => {
    const choiceInput = form.querySelector('[data-feedback-choice]');
    const choices = [...form.querySelectorAll('[data-feedback-value]')];
    const followup = form.querySelector('[data-feedback-followup]');
    const status = form.querySelector('[data-feedback-status]');
    const saveButton = form.querySelector('[data-feedback-save]');

    const post = async fields => {
      if (isLocalPreview) {
        const storageKey = 'starbound-demo-feedback';
        const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
        saved.push({ form: form.name, ...fields, saved_at: new Date().toISOString() });
        localStorage.setItem(storageKey, JSON.stringify(saved));
        return;
      }
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': form.name, ...fields })
      });
      if (!response.ok) throw new Error(`Netlify form returned ${response.status}`);
    };

    choices.forEach(button => button.addEventListener('click', async () => {
      const value = button.dataset.feedbackValue;
      choiceInput.value = value;
      saveButton.textContent = 'Save optional feedback';
      choices.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      followup.hidden = false;
      status.textContent = 'Saving your answer…';
      try {
        await post({ audience: form.dataset.audience, response: value, submission_stage: 'choice' });
        status.textContent = isLocalPreview
          ? 'Your answer is saved in this browser preview. The questions below are optional.'
          : 'Your answer is saved. The questions below are optional.';
      } catch (error) {
        status.textContent = 'Your answer could not be saved. Please try again.';
        console.warn('Starbound feedback:', error.message);
      }
    }));

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!choiceInput.value) return;
      saveButton.disabled = true;
      status.textContent = 'Saving your optional feedback…';
      const data = Object.fromEntries(new FormData(form));
      try {
        await post({ ...data, submission_stage: 'follow-up' });
        status.textContent = isLocalPreview
          ? 'Thanks — your feedback is saved in this browser preview.'
          : 'Thanks — your feedback is saved.';
        saveButton.textContent = 'Saved';
      } catch (error) {
        status.textContent = 'Your feedback could not be saved. Please try again.';
        console.warn('Starbound feedback:', error.message);
      } finally {
        saveButton.disabled = false;
      }
    });
  });
})();
