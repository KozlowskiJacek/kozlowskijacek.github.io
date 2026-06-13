import React from 'react'

const Start = () => {
  return (
    <div className="min-h-screen bg-bg_color_1 text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-main_accent">
            CodeCut
          </h1>

          <p className="text-2xl md:text-3xl text-gray_400 mt-2">
            Studio
          </p>

          <p className="mt-6 text-gray_200 max-w-2xl mx-auto">
            Tworzę nowoczesne aplikacje, strony internetowe i materiały
            wideo dla firm oraz klientów indywidualnych.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Portfolio */}
          <a
            href="/portfolio"
            className="
              group
              bg-bg_color_2
              border border-gray_600
              rounded-3xl
              p-8
              transition-all
              duration-300
              hover:border-main_accent
              hover:-translate-y-2
            "
          >
            <div className="text-main_accent text-4xl mb-4">💼</div>

            <h2 className="text-3xl font-bold mb-3">
              Zobacz portfolio
            </h2>

            <p className="text-gray_400 mb-6">
              Projekty aplikacji, stron internetowych i innych realizacji.
            </p>

            <span className="text-main_accent font-semibold group-hover:underline">
              Chcę Cię zatrudnić →
            </span>
          </a>

          {/* Services */}
          <a
            href="/services"
            className="
              group
              bg-bg_color_2
              border border-gray_600
              rounded-3xl
              p-8
              transition-all
              duration-300
              hover:border-button
              hover:-translate-y-2
            "
          >
            <div className="text-button text-4xl mb-4">🚀</div>

            <h2 className="text-3xl font-bold mb-3">
              Zamów usługę
            </h2>

            <p className="text-gray_400 mb-6">
              Potrzebujesz aplikacji mobilnej, strony internetowej lub montażu
              filmu? Opisz swój pomysł.
            </p>

            <span className="text-button font-semibold group-hover:underline">
              Chcę wycenę projektu →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}


export default Start