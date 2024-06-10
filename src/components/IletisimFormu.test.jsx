import { afterEach, beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import fs from 'fs';
import path from 'path';
import IletisimFormu from './IletisimFormu';
//eksik import buraya
//fixin tuzağı buraya? detaylar readme dosyasında.
beforeEach(() => {
  render(<IletisimFormu />);
});
test('[1] hata olmadan render ediliyor', () => {
  render(<IletisimFormu />);
});

test('[2] iletişim formu headerı render ediliyor', () => {
  //get by text ile h1 tagini yakalayın
  //to be in the document, to be truthy, to have text content ile kontrol edin.
  expect(screen.getByText('İletişim Formu')).toBeInTheDocument();
  expect(screen.getByText('İletişim Formu')).toBeTruthy();
  expect(screen.getByText('İletişim Formu')).toHaveTextContent(
    'İletişim Formu'
  );
});

test('[3] kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
  //get by label text ile name alanını yakalayınız
  //find all by test id ile error mesajlarını yakalayın
  //to have length ile kontrol edin.
  const inputLabel = screen.getByLabelText('Ad*');
  fireEvent.change(inputLabel, { target: { value: 'abc' } });
  expect(await screen.findAllByTestId('error')).toHaveLength(1);
});

test('[4] kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
  //hiç bir alanı doldurmadan get by role ile butonu yakalayın
  //error mesajlarının to have lengthine bakarak kontrol edin
  const buton = screen.getByRole('button');
  fireEvent.click(buton);
  expect(await screen.findAllByTestId('error')).toHaveLength(3);
});

test('[5] kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
  //get by test id ile input alanlarını yakalayın
  //error mesajlarının to have lengthine bakarak kontrol edin
  const nameInput = screen.getByTestId('name-input');
  const lastNameInput = screen.getByTestId('lastName-input');
  const buton = screen.getByRole('button');
  fireEvent.change(nameInput, { target: { value: 'abcdef' } });
  fireEvent.change(lastNameInput, { target: { value: '123456' } });
  fireEvent.click(buton);
  expect(await screen.findAllByTestId('error')).toHaveLength(1);
});

test('[6] geçersiz bir mail girildiğinde "Hata: email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  //errorı get by test id ile yakalayın
  //to have text content ile hata metnini kontrol edin
  const emailInput = screen.getByTestId('email-input');
  fireEvent.change(emailInput, { target: { value: 'abcdef' } });
  expect(screen.getByTestId('error')).toHaveTextContent(
    'Hata: email geçerli bir email adresi olmalıdır.'
  );
});

test('[7] soyad girilmeden gönderilirse "Hata: soyad gereklidir." mesajı render ediliyor', async () => {
  //find by text ve to be in the document ile hata metni ekranda mı kontrol edin

  const buton = screen.getByRole('button');
  fireEvent.click(buton);
  const lastNameInputError = await screen.findByText('Hata: soyad gereklidir.');
  expect(lastNameInputError).toBeInTheDocument();
});

test('[8] ad, soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
  const nameInput = screen.getByTestId('name-input');
  const lastNameInput = screen.getByTestId('lastName-input');
  const emailInput = screen.getByTestId('email-input');
  const messageInput = screen.getByTestId('message-input');
  const buton = screen.getByRole('button');

  fireEvent.change(nameInput, { target: { value: 'abcdef' } });
  fireEvent.change(lastNameInput, { target: { value: '123456' } });
  fireEvent.change(emailInput, { target: { value: 'asdads@gmail.com' } });
  fireEvent.click(buton);
});

test('[9] form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
  const nameInput = screen.getByTestId('name-input');
  const lastNameInput = screen.getByTestId('lastName-input');
  const emailInput = screen.getByTestId('email-input');
  const messageInput = screen.getByTestId('message-input');
  const buton = screen.getByRole('button');

  fireEvent.change(nameInput, { target: { value: 'abcdef' } });
  fireEvent.change(lastNameInput, { target: { value: '123456' } });
  fireEvent.change(emailInput, { target: { value: 'abcdef@hotmail.com' } });
  fireEvent.click(buton);
});
//

//

// BURADAN SONRASINA DOKUNMAYIN //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const testFile = fs
  .readFileSync(path.resolve(__dirname, './IletisimFormu.test.jsx'), 'utf8')
  .replaceAll(/(?:\\r\\n|\\r|\\n| )/g, '');
const tests = testFile.split("test('[");

test('Kontrol: IletisimFormu componenti import edilmiş.', async () => {
  expect(tests[0]).toContain('importIletisimFormufrom');
});

test('Kontrol: test[1] için render metodu kullanılmış', async () => {
  expect(tests[1]).toContain('render(<IletisimFormu');
});

test('Kontrol: test[2] için screen.getByText(...) kullanılmış', async () => {
  expect(tests[2]).toContain('screen.getByText(');
});

test('Kontrol: test[2] için .toBeInTheDocument() ile kontrol edilmiş', async () => {
  expect(tests[2]).toContain('.toBeInTheDocument()');
});

test('Kontrol: test[2] için .toBeTruthy() ile kontrol edilmiş', async () => {
  expect(tests[2]).toContain('.toBeTruthy()');
});

test('Kontrol: test[2] için .toHaveTextContent(...) ile kontrol edilmiş', async () => {
  expect(tests[2]).toContain('.toHaveTextContent(');
});

test('Kontrol: test[3] için screen.getByLabelText(...) kullanılmış', async () => {
  expect(tests[3]).toContain('screen.getByLabelText(');
});

test('Kontrol: test[3] için screen.findAllByTestId(...) kullanılmış', async () => {
  expect(tests[3]).toContain('screen.findAllByTestId(');
});

test('Kontrol: test[3] için findAllByTestId await ile kullanılmış', async () => {
  expect(tests[3]).toContain('awaitscreen.findAllByTestId');
});

test('Kontrol: test[3] için .toHaveLength(...) ile kontrol edilmiş', async () => {
  expect(tests[3]).toContain('.toHaveLength(1)');
});

test('Kontrol: test[4] için .getByRole(...) kullanılmış ', async () => {
  expect(tests[4]).toContain('screen.getByRole(');
});

test('Kontrol: test[4] için .toHaveLength(...) ile kontrol edilmiş', async () => {
  expect(tests[4]).toContain('.toHaveLength(3)');
});

test('Kontrol: test[5] için .getByTestId(...) kullanılmış', async () => {
  expect(tests[5]).toContain('screen.getByTestId(');
});

test('Kontrol: test[5] için .toHaveLength(...) ile kontrol edilmiş', async () => {
  expect(tests[5]).toContain('.toHaveLength(1)');
});

test('Kontrol: test[6] için .getByTestId(...) kullanılmış', async () => {
  expect(tests[6]).toContain('screen.getByTestId(');
});

test('Kontrol: test[6] için .toHaveTextContent(...) ile kontrol edilmiş', async () => {
  expect(tests[6]).toContain(').toHaveTextContent(');
});

test('Kontrol: test[7] için .findByText(...) await ile kullanılmış', async () => {
  expect(tests[7]).toContain('awaitscreen.findByText(');
});

test('Kontrol: test[7] için .toBeInTheDocument() ile kontrol edilmiş', async () => {
  expect(tests[7]).toContain(').toBeInTheDocument()');
});

test('Kontrol: tüm testlerde(test1 hariç) iletişim formu ayrı ayrı render edilmesi yerine beforeEach hooku kullılarak, render içinde yapılmış.', async () => {
  expect(tests[0]).toContain('beforeEach(()=>{');
  expect(tests[0]).toContain('render(<IletisimFormu/>)');
});
