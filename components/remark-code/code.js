import refractor from 'refractor'
import rehype from 'rehype'
import classNames from 'classnames'

const literal = '`'

const Code = ({ children, lang, noWrap, color }, { darkBg } = {}) => (
  <>
    {lang ? (
      <code
        className={classNames({
          dark: darkBg,
          'no-wrap': noWrap,
          [`language-${lang}`]: lang !== undefined
        })}
        dangerouslySetInnerHTML={{
          __html: rehype()
            .stringify({
              type: 'root',
              children: refractor.highlight(children, lang)
            })
            .toString()
        }}
      />
    ) : (
      <code
        className={classNames({
          dark: darkBg,
          'no-wrap': noWrap
        })}
      >
        {children}
      </code>
    )}
    <style jsx>
      {`
        code {
          color: ${color ? color : '#bd10e0'};
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 0.9em;
          white-space: pre-wrap;
        }

        code.no-wrap {
          white-space: nowrap;
        }

        code::before {
          content: '${literal}';
        }

        code::after {
          content: '${literal}';
        }

        

        
        :global(pre) code {
          color: #000;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 13px;
          line-height: 20px;
        }

        :global(pre).dark {
          border-color: #333;
          background: transparent;
        }

        code.dark {
          color: #fff;
        }
        code.dark.bash {
          color: #50e3c2;
        }

        :global(pre) code::before {
          content: none;
        }

        :global(pre) code::after {
          content: none;
        }


      `}
    </style>
  </>
)

export default Code
