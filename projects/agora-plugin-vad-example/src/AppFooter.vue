<template>
  <footer>
    <span>
      The Web VAD ("the Product") is a testing product provided by Agora, mainly
      to demonstrate the effects achievable after embedding the Agora SDK to
      Agora's customers. The Product is provided for testing purposes only to
      existing or potential customers, and not as a formal product for public
      use. Agora owns the copyright and all rights of the Product. No one is
      allowed to modify, merge, adjust, reverse engineer, sublicense, and/or
      sell copies of the software, or take any other actions that may harm
      Agora's legal rights and interests.
      <br />
      If you wish to try the Product, you are welcome to download, install, and
      use it. Agora hereby grants you the right to use the Product for free
      worldwide. The Product is provided "as is", without any warranty of any
      kind, express or implied, including but not limited to warranties of
      merchantability, fitness for a specific purpose, and non-infringement.
      Agora shall not be liable for any claims, damages, or other liabilities
      resulting from any contractual, tortious, or any other matters related to
      the Product, its use, or otherwise.
      <br />
      By downloading, installing, and using the Product, you acknowledge and
      agree that Agora shall not be responsible for any loss or damage, in any
      form, to you or any third party, arising for any reason during the trial
      of the Product. If you have any questions, please contact
      <a class="text-blue-500 hover:underline" href="mailto:support@agora.io"
        >support@agora.io</a
      >
      .
    </span>
  </footer>
</template>

<style lang="less">
footer {
  text-align: center;
  padding: 1rem 8rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(82, 82, 82);

  background-color: rgb(245, 245, 245);

  span {
    text-align: left;
    display: inline-block;
    max-width: 1280px;
  }
}

@media (max-width: 768px) {
  footer {
    padding: 1rem 1.5rem !important;
  }
}
</style>
