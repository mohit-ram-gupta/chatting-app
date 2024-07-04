<Box
  mt={1}
  style={{ background: "hsl(225deg 7.79% 30.2%)", padding: "15px", borderRadius: "8px" }}
  ref={containerRef}
  sx={{
    height: "65vh",
    overflowY: "scroll",
  }}
  onScroll={(e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop <= 20 && hasMoreFilterData) {
      fetchMoreData();
    }
  }}
>
  <InfiniteScroll
    dataLength={scrollVal}
    next={fetchMoreData}
    hasMore={hasMoreFilterData}
    loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
    endMessage={
      <p style={{ textAlign: "center" }}>
        {/* <b>No New Message</b> */}
      </p>
    }
    scrollableTarget={containerRef.current}
  >
    {Array.isArray(user) &&
      user.slice(-scrollVal).map((item, index) => {
        const wordCount = item.message ? item.message.split(' ').length : 0;
        
        const getWidth = (wordCount) => {
          const baseWidth = 50; // Base width for very short messages
          const maxWidth = 600; // Maximum width for very long messages
          const widthPerWord = 10; // Width increment per word
          return Math.min(baseWidth + wordCount * widthPerWord, maxWidth);
        };

        const width = `${getWidth(wordCount)}px`;

        return (
          <Box
            key={index}
            style={{
              boxShadow: "3px 3px 16px -4px rgb(0 0 0 / 30%)",
              color: "white",
              marginLeft: item.receiver_id === selectId ? "30rem" : "1rem",
              marginRight: item.receiver_id !== selectId ? "30rem" : "1rem",
              paddingLeft: "20px",
              paddingBottom: "2px",
              borderRadius: 5,
              marginTop: index === 0 ? "" : 10,
              borderRadius: "8px",
              background: item.receiver_id === selectId ? "hsl(225deg 14.63% 16.08%)" : "hsl(225deg 14.63% 16.08%)",
              width: width,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={"20px"}
            >
              <Grid container>
                <Grid item xs={12} lg={10}>
                  <Box alignItems="center">
                    <Box
                      style={{
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.message && (
                        <Box
                          style={{
                            textTransform: "capitalize",
                            fontSize: "15px",
                          }}
                        >
                          {item.message}
                        </Box>
                      )}
                      {item.image && (
                        <a
                          style={{ textDecoration: "none" }}
                          href={`http://localhost/chatting-app-php-react/images/${item.image}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            style={{
                              width: "100%",
                              cursor: "pointer",
                            }}
                            src={`http://localhost/chatting-app-php-react/images/${item.image}`}
                            alt=""
                          />
                        </a>
                      )}
                      {item.pdf && (
                        <div>
                          <a
                            style={{ textDecoration: "none" }}
                            href={`http://localhost/chatting-app-php-react/pdf/${item.pdf}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              style={{
                                width: "100%",
                              }}
                              src={pdfLogo}
                              alt=""
                            />
                            <h5
                              style={{
                                color: "white",
                                marginTop: "10px",
                              }}
                            >
                              Download PDF &nbsp; <BiDownload />
                            </h5>
                          </a>
                        </div>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {item.id === selectedTripID && (
              <Box display="flex"></Box>
            )}
          </Box>
        );
      })}
  </InfiniteScroll>
</Box>
