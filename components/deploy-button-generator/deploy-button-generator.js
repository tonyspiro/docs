import { useState, useEffect } from 'react'
import { useAmp } from 'next/amp'
import Tabs from '~/components/tabs'
import Snippet from '~/components/snippet'
import Details from '~/components/details'
import Input from '~/components/input'
import Button from '~/components/buttons'
import Spacer from '~/components/spacer'
import Container from '~/components/layout/container'
import Caption from '~/components/text/caption'
import Label from '~/components/label'
import Cross from '~/components/icons/x'
import Link from '~/components/text/link'
import Heading from '~/components/text/linked-heading'
import Text, { H2, H3 } from '~/components/text'
import Center from '~/components/layout/center'
import styles from './deploy-button-generator.module.css'
import HR from '~/components/text/hr'

const generateId = () =>
  Math.random()
    .toString(36)
    .split('.')[1]

export default function DeployButtonGenerator() {
  const defaultRepo =
    'https://github.com/vercel/next.js/tree/canary/examples/hello-world'
  const [selected, setSelected] = useState('markdown')
  const [repository, setRepository] = useState(defaultRepo)
  const [env, setEnv] = useState([{ value: '', id: generateId() }])
  const [envDescription, setEnvDescription] = useState('')
  const [envLink, setEnvLink] = useState('')
  const [envLinkError, setEnvLinkError] = useState('')
  const [redirectUrl, setRedirectUrl] = useState('')
  const [developerId, setDeveloperId] = useState('')
  const [developerIdError, setDeveloperIdError] = useState('')
  const [projectName, setProjectName] = useState('')
  const [repoName, setRepoName] = useState('')
  const isAmp = useAmp()
  const importUrl = 'https://vercel.com/import/git'

  const onRepositoryChange = event => {
    const newRepo = event.target.value

    setRepository(newRepo)
  }

  const handleAddEnv = event => {
    event.preventDefault()
    setEnv([...env, { value: '', id: generateId() }])
  }

  const handleRemoveEnv = (index, event) => {
    event.preventDefault()
    let newEnvs = [...env]
    newEnvs.splice(index, 1)
    setEnv(newEnvs)
  }

  const handleChangeEnv = (index, value) => {
    let newEnvs = [...env]
    newEnvs[index].value = value
    setEnv(newEnvs)
  }

  const handleEnvDescChange = event => {
    setEnvDescription(event.target.value)
  }

  const handleEnvLinkChange = event => {
    setEnvLink(event.target.value)
  }

  const handleProjectNameChange = event => {
    setProjectName(event.target.value)
  }

  const handleRepoNameChange = event => {
    setRepoName(event.target.value)
  }

  const handleRedirectURLChange = event => {
    setRedirectUrl(event.target.value)
  }

  const handleDeveloperIDChange = event => {
    setDeveloperId(event.target.value)
  }

  const filteredEnv = env.filter(envVar => envVar.value !== '')
  const hasEnv = filteredEnv.length !== 0
  const envValues = filteredEnv.map(envVar => envVar.value).toString()

  useEffect(() => {
    if (hasEnv && envDescription === '' && envLink !== '') {
      setEnvLinkError(
        'An Environment Variable Link requires an Environment Variables Description.'
      )
    } else {
      setEnvLinkError('')
    }
  }, [env, envDescription, envLink])

  useEffect(() => {
    if (redirectUrl === '' && developerId !== '') {
      setDeveloperIdError('A Developer ID requires an Redirect URL.')
    } else {
      setDeveloperIdError('')
    }
  }, [redirectUrl, developerId])

  const completeUrl = `${importUrl}?s=${repository || defaultRepo}${
    hasEnv ? `&env=${envValues}` : ''
  }${
    hasEnv && envDescription
      ? `&envDescription=${encodeURIComponent(envDescription)}`
      : ''
  }${hasEnv && envDescription && envLink ? `&envLink=${envLink}` : ''}${
    projectName ? `&project-name=${encodeURIComponent(projectName)}` : ''
  }${repoName ? `&repo-name=${encodeURIComponent(repoName)}` : ''}${
    redirectUrl ? `&redirect-url=${encodeURIComponent(redirectUrl)}` : ''
  }${developerId ? `&developer-id=${developerId}` : ''}`

  const completeHTMLUrl = (
    <span>
      {importUrl}?<b>s={repository || defaultRepo}</b>
      {hasEnv ? (
        <>
          &amp;<b>env={envValues}</b>
        </>
      ) : null}
      {hasEnv && envDescription ? (
        <>
          &amp;<b>envDescription={encodeURIComponent(envDescription)}</b>
        </>
      ) : null}
      {hasEnv && envDescription && envLink ? (
        <>
          &amp;<b>envLink={envLink}</b>
        </>
      ) : null}
      {projectName ? (
        <>
          &amp;<b>project-name={encodeURIComponent(projectName)}</b>
        </>
      ) : null}
      {repoName ? (
        <>
          &amp;<b>repository-name={encodeURIComponent(repoName)}</b>
        </>
      ) : null}
      {redirectUrl ? (
        <>
          &amp;<b>redirect-url={encodeURIComponent(redirectUrl)}</b>
        </>
      ) : null}
      {developerId ? (
        <>
          &amp;<b>developer-id={developerId}</b>
        </>
      ) : null}
    </span>
  )

  return (
    <>
      {!isAmp && (
        <>
          <Center>
            <Link href={completeUrl}>
              <img src="https://vercel.com/button" width={104} height={36} />
            </Link>
          </Center>
          <Caption>
            An example Deploy Button using the following{' '}
            <Link href="#snippets">HTML snippet</Link>.
          </Caption>
        </>
      )}

      <Heading lean offsetTop={175}>
        <H2>Snippets</H2>
      </Heading>

      <Text>
        Use the following Deploy Button snippets in your templates to help users
        get started with their own projects by cloning and deploying from a Git
        repository.
      </Text>

      <Tabs
        tabs={[
          { title: 'Markdown', value: 'markdown' },
          { title: 'HTML', value: 'html' },
          { title: 'URL', value: 'url' }
        ]}
        selected={selected}
        setSelected={setSelected}
      />

      {selected === 'url' && (
        <div className={styles.urlTab}>
          <Snippet
            width="100%"
            dark
            prompt={false}
            copyText={completeUrl}
            text={completeHTMLUrl}
          />
          <Caption>A Deploy Button source URL.</Caption>
        </div>
      )}

      {selected === 'markdown' && (
        <div className={styles.urlTab}>
          <Snippet
            width="100%"
            dark
            prompt={false}
            copyText={`[![Deploy with Vercel](https://vercel.com/button)](${completeUrl})`}
            text={
              <>
                [![Deploy with Vercel](https://vercel.com/button)](
                {completeHTMLUrl})
              </>
            }
          />
          <Caption>
            A Markdown snippet that shows a linked Deploy Button.
          </Caption>
        </div>
      )}

      {selected === 'html' && (
        <div className={styles.urlTab}>
          <Snippet
            width="100%"
            dark
            prompt={false}
            copyText={`<a href="${completeUrl}"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>`}
            text={
              <span>
                {`<a href="`}
                {completeHTMLUrl}
                {`"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>`}
              </span>
            }
          />
          <Caption>A HTML snippet that shows a linked Deploy Button.</Caption>
        </div>
      )}

      <Heading lean offsetTop={175}>
        <H3>Generate Your Own</H3>
      </Heading>

      <Text>
        Use the following form to configure the Deploy Button URL, generated in
        the above snippet.
      </Text>

      <Text>
        Start with the public template repository URL from GitHub, GitLab, or
        Bitbucket you want to use as a source for users to clone and deploy.
      </Text>

      <form className={styles.settingsForm}>
        <div className={styles.settingsSection}>
          <Container>
            <Input
              placeholder="Enter a Git Repository"
              defaultValue={defaultRepo}
              width="100%"
              label="Git Repository"
              onChange={onRepositoryChange}
            />
          </Container>

          <Spacer />
          <Text small>
            <Link href="#repository-url">
              Learn more about the Git Repository URL parameter
            </Link>
            .
          </Text>
        </div>

        <div className={styles.settingsSection}>
          <Details title="Environment Variables">
            <Text id="env-description">
              Define Environment Variable Keys that requires the user to fill in
              values for what the app needs to run.
            </Text>
            <Spacer />
            <Label value="Environment Variables Keys" elId="env-label" />
            <div aria-describedby="env-description" aria-labelledby="env-label">
              {env.map((envVar, index) => (
                <>
                  <div className={styles.envRow} key={envVar.id}>
                    <Input
                      placeholder="Enter a Required Environment Variable"
                      width="100%"
                      value={envVar.value}
                      onChange={event =>
                        handleChangeEnv(index, event.target.value)
                      }
                    />
                    <Spacer x={0.5} />
                    <Button
                      disabled={env.length === 1}
                      type="secondary"
                      width={70}
                      icon={<Cross />}
                      onClick={event => handleRemoveEnv(index, event)}
                    />
                  </div>
                  <Spacer />
                </>
              ))}
              <Button onClick={handleAddEnv}>Add Environment Variable</Button>
            </div>
            <Spacer />
            <Text small>
              <Link href="#required-environment-variables">
                Learn more about the Environment Variable parameters
              </Link>
              .
            </Text>
            <HR spacing={24} />
            <Text id="env-description">
              Add additional information through a description and link to
              documentation tha helps users understand what they are filling
              Environment Variables for.
            </Text>
            <Input
              label="Environment Variables Description"
              placeholder="Enter a description of the Environment Variables"
              onChange={handleEnvDescChange}
            />
            <Spacer />
            <Input
              label="Environment Variables Link"
              placeholder="Enter a link that describes the Environment Variables"
              onChange={handleEnvLinkChange}
              error={envLinkError}
            />
          </Details>
        </div>

        <div className={styles.settingsSection}>
          <Details title="Defaults">
            <Text>
              If you're setting up a project on behalf of the user and already
              know what name the user likely wants, enter a default project
              name. Additionally fill this is for the repository name.
            </Text>
            <Input
              label="Default Project Name"
              placeholder="Enter a default project name"
              onChange={handleProjectNameChange}
            />
            <Spacer />
            <Input
              label="Default Repository Name"
              placeholder="Enter a default repository name"
              onChange={handleRepoNameChange}
            />
          </Details>
        </div>

        <div className={styles.settingsSection}>
          <Details title="Redirect">
            <Text>
              The Redirect URL parameter allows you to redirect the user back to
              your platform on the event of a successful deployment.
            </Text>
            <Input
              label="Redirect URL"
              placeholder="Enter a Redirect URL"
              onChange={handleRedirectURLChange}
            />
            <Spacer />
            <Text small>
              <Link href="#redirect-url">
                Learn more about the Redirect URL parameter
              </Link>
              , including information Vercel passes on.
            </Text>
            <HR spacing={16} />
            <Text>
              Set a Developer ID to show a logo and name from an{' '}
              <Link href="/docs/integrations">Integration</Link> by using its
              Client ID, found in the Integration Developer Console.
            </Text>
            <Input
              label="Developer ID"
              placeholder="Enter a Developer ID"
              onChange={handleDeveloperIDChange}
              error={developerIdError}
            />
            <Spacer />
            <Text small>
              <Link href="#developer-id">
                Learn more about the Developer ID parameter
              </Link>
              .
            </Text>
          </Details>
        </div>
      </form>
    </>
  )
}
