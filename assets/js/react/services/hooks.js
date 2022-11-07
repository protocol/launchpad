import goalsConfigs from "./config/_default/goals.json"

export const useStorage = key => {
  const store = window.store

  const setValue = value => {
    store.set(key, value)
  }
  const getValue = () => {
    return store.get(key)
  }

  return [getValue(), setValue]
}

export const useContentLevel = () => {
  const [value, setValue] = useStorage("content_level");

  const setContentLevel = level => {
    setValue(level)
  }
  const getContentLevel = () => {
    return value
  }

  return [getContentLevel(), setContentLevel]
}

export const useSidebarMenuElements = () => {
  const menu = document.getElementById('doks-docs-nav')
  return Array.from(menu.querySelectorAll('[data-id]'))
}

export const useCurrentPageId = () => {
  const currentPageTitle = document.querySelector('[data-page-id]')
  return currentPageTitle.getAttribute('data-page-id')
}

export const useGoal = (section, goalId) => {
  const sectionGoals = goalsConfigs[section]
  if (!sectionGoals) {
    return null
  }

  const goal = sectionGoals[goalId]
  if (!goal) {
    return  null
  }

  return goal
}

export const useQuizQuestions = async (section, questionIds) => {
  try {
    const questionsJson = await import(`./config/_default/quizzes/${section}.json`)
    console.log(questionsJson)

    const questions = []

    for (const questionId of questionIds) {
      const question = questionsJson[questionId]
      if (question) {
        questions.push(question)
      }
    }

    return questions
  } catch (e) {
    console.log(e)
    return []
  }
}

export const useProgress = (page) => {
  const [progress, setProgress] = useStorage(`progress-${page}`)

  return [progress, setProgress]
}
