import cn from 'classnames';
import MarkdownHeader from '../MarkdownHeader';
import NavigationFooter from '../NavigationFooter';
import PageWrapper from '../PageWrapper';
import React from 'react';
import {StickyContainer} from 'react-sticky';
import PropTypes from 'prop-types';
import StickySidebar from '../StickySidebar';
import dateToString from '../../utils/dateToString';
import findSectionForPath from '../../utils/findSectionForPath';
import toCommaSeparatedList from '../../utils/toCommaSeparatedList';
import styles from './MarkdownPage.module.scss';

// TODO Use 'react-helmet' to set metadata

const MarkdownPage = ({
  authors,
  date,
  location,
  markdownRemark,
  sectionList,
}) => {
  const hasAuthors = authors.length > 0;

  return (
      <PageWrapper enablePaddingTop={true}>
        <StickyContainer className={styles.Sticky}>
          <article className={styles.Main}>
            <div className={styles.Inner}>
              <MarkdownHeader
                path={markdownRemark.fields.path}
                title={markdownRemark.frontmatter.title}
              />
            </div>

            {(date || hasAuthors) &&
              <div className={cn(styles.Inner, styles.AuthorAndDate)}>
                {date ? `${dateToString(date)} ` : ''}
                {hasAuthors &&
                  <span>
                    by {toCommaSeparatedList(authors, author => (
                      <a
                        className={styles.Link}
                        href={author.frontmatter.url}
                        key={author.frontmatter.name}>
                        {author.frontmatter.name}
                      </a>
                    ))}
                  </span>}
              </div>}

            <div
              className={cn(styles.Body, styles.Inner)}
              dangerouslySetInnerHTML={{__html: markdownRemark.html}}
            />
          </article>

          <StickySidebar
            defaultActiveSection={findSectionForPath(
              location.pathname,
              sectionList,
            )}
            location={location}
            sectionList={sectionList}
          />
        </StickyContainer>

        {/* TODO Read prev/next from index map, not this way */}
        <NavigationFooter
          next={markdownRemark.frontmatter.next}
          prev={markdownRemark.frontmatter.prev}
        />
      </PageWrapper>
  );
}

MarkdownPage.defaultProps = {
  authors: [],
};

// TODO Better types
MarkdownPage.propTypes = {
  authors: PropTypes.array.isRequired,
  date: PropTypes.object,
  location: PropTypes.object.isRequired,
  markdownRemark: PropTypes.object.isRequired,
  sectionList: PropTypes.array.isRequired,
};

export default MarkdownPage;
