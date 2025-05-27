const useSmoothScroll = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return scrollTo
}

export default useSmoothScroll