import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './TrialForm.css';

function TrialForm() {
  
  return (
<div className='Form'>
<div class="form-container">
    <h2>TAKE A FREE TRIAL HERE?</h2>
    <form>
        <div class="form-group">
            <div class="form-group-half form-name">
                <input type="text" placeholder="Name"/>
            </div>
            <div class="form-group-half form-email">
                <input type="email" placeholder="Email"/>
            </div>
        </div>
        <div class="form-phone">
            <input type="tel" placeholder="Phone"/>
        </div>
        <div class="form-location">
            <input type="text" placeholder="Location"/>
        </div>
        <div className="form-captcha">
          <ReCAPTCHA sitekey="6LdQSPYpAAAAABjudgS18p0hBl5Ka1WkhwAcDvM-" />
        </div>
        <button type="submit" class="submit-button">START MY FREE TRIAL</button>
    </form>
</div>
</div>
  );
}

export default TrialForm;
