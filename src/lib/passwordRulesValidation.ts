const PasswordRulesValidation = (str: string) => {
  const rules = {} as any;

  if (str.length >= 8) {
    rules.rule1 = true;
  } else {
    rules.rule1 = false;
  }

  if (/[a-z]/.test(str)) {
    rules.rule2 = true;
  } else {
    rules.rule2 = false;
  }

  if (/[A-Z]/.test(str)) {
    rules.rule3 = true;
  } else {
    rules.rule3 = false;
  }

  if (/[1-9]/.test(str)) {
    rules.rule4 = true;
  } else {
    rules.rule4 = false;
  }

  // eslint-disable-next-line no-useless-escape
  if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)) {
    rules.rule5 = true;
  } else {
    rules.rule5 = false;
  }
  return rules;
};

export default PasswordRulesValidation;
